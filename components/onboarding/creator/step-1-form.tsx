'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { OnboardingProgressBar } from '@/components/onboarding/progress-bar'
import { NicheGrid } from '@/components/onboarding/niche-grid'
import { creatorStep1Schema, type CreatorStep1Form } from '@/lib/onboarding-schemas'
import { NICHE_OPTIONS } from '@/constants/onboarding'
import { useSaveCreatorStep1 } from '@/hooks/use-onboarding'
import type { NicheValue } from '@/types/api'
import { cn } from '@/lib/utils'

const EXPERIENCE_OPTIONS = [
  { label: '1 yr',  value: 1 },
  { label: '2 yrs', value: 2 },
  { label: '3 yrs', value: 3 },
  { label: '4 yrs', value: 4 },
  { label: '5 yrs', value: 5 },
  { label: '6–10',  value: 7 },
  { label: '10+',   value: 11 },
]

interface Props {
  defaultName: string
}

export function CreatorStep1Form({ defaultName }: Props): React.ReactElement {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedNiches, setSelectedNiches] = useState<NicheValue[]>([])
  const { mutateAsync, isPending } = useSaveCreatorStep1()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatorStep1Form>({
    resolver: zodResolver(creatorStep1Schema),
    defaultValues: { fullName: defaultName },
    mode: 'onChange',
  })

  const fullName = watch('fullName')
  const experienceYears = watch('experienceYears')
  const canSubmit = fullName?.length >= 2 && selectedNiches.length === 1 && !!experienceYears && !isPending

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useGSAP(() => {
    if (!containerRef.current) return
    gsap.from(containerRef.current, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' })
  }, [])

  const onSubmit = async (data: CreatorStep1Form) => {
    try {
      await mutateAsync(data)
      sessionStorage.setItem(
        'creonex_ob_step1',
        JSON.stringify({
          primaryNiche: data.primaryNiche,
          experienceYears: data.experienceYears,
          fullName: data.fullName,
        }),
      )
      router.push('/onboarding/creator/step-2')
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div ref={containerRef} className="w-full max-w-[28rem] space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <OnboardingProgressBar currentStep={1} totalSteps={3} label="Your expertise" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">What&apos;s your name?</label>
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              {...register('fullName')}
              ref={(el) => {
                register('fullName').ref(el)
                ;(inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el
              }}
              placeholder="Your full name"
              className="pl-10"
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Primary area of expertise</label>
            <p className="mt-0.5 text-xs text-muted-foreground">Pick the one you know best</p>
          </div>
          <Controller
            name="primaryNiche"
            control={control}
            render={({ field }) => (
              <NicheGrid
                options={NICHE_OPTIONS}
                selected={selectedNiches}
                onChange={(values) => {
                  setSelectedNiches(values)
                  field.onChange(values[0] ?? '')
                  setValue('primaryNiche', values[0] as NicheValue)
                }}
                maxSelect={1}
              />
            )}
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Years of experience</label>
          <Controller
            name="experienceYears"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {EXPERIENCE_OPTIONS.map((opt) => (
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

        <div className="space-y-2">
          <Button type="submit" className="w-full gap-2" disabled={!canSubmit}>
            {isPending ? (
              <FontAwesomeIcon icon={faSpinner} className="size-4 animate-spin" />
            ) : null}
            Continue
            {!isPending && <FontAwesomeIcon icon={faArrowRight} className="size-4" />}
          </Button>
          <p className="text-center text-[11px] text-muted-foreground">
            3 quick steps and your profile goes live
          </p>
        </div>
      </form>
    </div>
  )
}
