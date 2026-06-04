'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faRocket,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { OnboardingProgressBar } from '@/components/onboarding/progress-bar'
import { creatorStep3Schema, type CreatorStep3Form } from '@/lib/onboarding-schemas'
import {
  OFFER_TYPE_OPTIONS,
  DURATION_OPTIONS,
  PLATFORM_FEE_PERCENT,
  MIN_PRICE,
  NICHE_OPTIONS,
  TITLE_MAX_LENGTH,
} from '@/constants/onboarding'
import { useSaveCreatorStep3 } from '@/hooks/use-onboarding'
import type { OfferType, NicheValue } from '@/types/api'
import { cn } from '@/lib/utils'

export function CreatorStep3Form(): React.ReactElement {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const feePreviewRef = useRef<HTMLDivElement>(null)
  const { mutateAsync, isPending } = useSaveCreatorStep3()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatorStep3Form>({
    resolver: zodResolver(creatorStep3Schema),
    defaultValues: {
      offerType: 'one_on_one',
      title: '',
      price: 0,
      durationMinutes: 45,
    },
    mode: 'onChange',
  })

  const offerType = watch('offerType')
  const price = watch('price')
  const titleValue = watch('title')
  const canSubmit = titleValue?.length >= 5 && price >= MIN_PRICE && !isPending

  const fee = Math.round((price ?? 0) * PLATFORM_FEE_PERCENT / 100)
  const payout = (price ?? 0) - fee

  useGSAP(() => {
    if (!containerRef.current) return
    gsap.from(containerRef.current, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' })
    if (feePreviewRef.current) {
      gsap.set(feePreviewRef.current, { opacity: 0, y: 8 })
    }
  }, [])

  useGSAP(() => {
    if (!feePreviewRef.current) return
    if ((price ?? 0) > 0) {
      gsap.to(feePreviewRef.current, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' })
    } else {
      gsap.to(feePreviewRef.current, { opacity: 0, y: 8, duration: 0.15 })
    }
  }, [price])

  const autoFillTitle = (type: OfferType) => {
    try {
      const raw = sessionStorage.getItem('creonex_ob_step1')
      if (!raw) return
      const { primaryNiche, fullName } = JSON.parse(raw) as { primaryNiche: NicheValue; fullName: string }
      const nicheLabel = NICHE_OPTIONS.find((n) => n.value === primaryNiche)?.label ?? primaryNiche
      const firstName = fullName.split(' ')[0] ?? fullName
      const titles: Record<OfferType, string> = {
        one_on_one: `1:1 ${nicheLabel} Session with ${firstName}`,
        workshop: `${nicheLabel} Workshop`,
        group: `${nicheLabel} Group Session`,
        digital: `${nicheLabel} Resource Pack`,
      }
      setValue('title', titles[type])
    } catch {
      // sessionStorage unavailable — leave title as is
    }
  }

  const onSubmit = async (data: CreatorStep3Form) => {
    try {
      const result = await mutateAsync(data)
      sessionStorage.setItem('creonex_ob_complete', JSON.stringify({
        username: result.username,
        profileUrl: result.profileUrl,
      }))
      router.push('/onboarding/creator/complete')
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div ref={containerRef} className="w-full max-w-[28rem] space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <OnboardingProgressBar currentStep={3} totalSteps={3} label="Your first offer" />

      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="size-3" />
        Back
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Offer type */}
        <div className="space-y-3">
          <label className="text-sm font-medium">What type of offer?</label>
          <Controller
            name="offerType"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-2">
                {OFFER_TYPE_OPTIONS.map((opt) => {
                  const isSelected = field.value === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        field.onChange(opt.value)
                        autoFillTitle(opt.value)
                      }}
                      className={cn(
                        'relative rounded-xl border p-3 text-left transition-all duration-150',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        isSelected ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50',
                      )}
                    >
                      {opt.recommended && (
                        <Badge variant="secondary" className="absolute right-2 top-2 text-[10px]">
                          Recommended
                        </Badge>
                      )}
                      <FontAwesomeIcon
                        icon={opt.icon}
                        className={cn('mb-1.5 size-4', isSelected ? 'text-primary' : 'text-muted-foreground')}
                      />
                      <p className={cn('text-sm font-medium', isSelected ? 'text-primary' : 'text-foreground')}>
                        {opt.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-tight">{opt.description}</p>
                    </button>
                  )
                })}
              </div>
            )}
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Offer title</label>
          <div className="relative">
            <Input
              {...register('title')}
              placeholder="e.g. 1:1 DSA Interview Prep"
              maxLength={TITLE_MAX_LENGTH}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] tabular-nums text-muted-foreground">
              {titleValue?.length ?? 0} / {TITLE_MAX_LENGTH}
            </span>
          </div>
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Price (₹)</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ₹
            </span>
            <Input
              {...register('price', { valueAsNumber: true })}
              type="number"
              min={99}
              placeholder="499"
              className="pl-8"
            />
          </div>
          {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}

          <div ref={feePreviewRef} className="rounded-lg bg-muted px-3 py-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">You set</span>
              <span className="font-medium">₹{price > 0 ? price : 0}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Platform fee ({PLATFORM_FEE_PERCENT}%)</span>
              <span className="font-medium text-muted-foreground">− ₹{fee}</span>
            </div>
            <div className="mt-1 flex items-center justify-between border-t border-border pt-1 text-xs">
              <span className="text-muted-foreground">You earn</span>
              <span className="font-semibold text-primary">₹{payout}</span>
            </div>
          </div>
        </div>

        {/* Duration — hidden for digital */}
        {offerType !== 'digital' && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Session duration</label>
            <Controller
              name="durationMinutes"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {DURATION_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => field.onChange(opt.value)}
                      className={cn(
                        'rounded-full border px-4 py-2 text-sm transition-colors duration-150',
                        field.value === opt.value
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-card text-foreground hover:border-primary/50',
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            />
          </div>
        )}

        <Button type="submit" className="w-full gap-2" disabled={!canSubmit}>
          {isPending ? (
            <FontAwesomeIcon icon={faSpinner} className="size-4 animate-spin" />
          ) : (
            <FontAwesomeIcon icon={faRocket} className="size-4" />
          )}
          {isPending ? 'Publishing…' : 'Publish my profile'}
        </Button>
      </form>
    </div>
  )
}
