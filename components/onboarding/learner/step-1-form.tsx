'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faSpinner,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { OnboardingProgressBar } from '@/components/onboarding/progress-bar'
import { learnerStep1Schema, type LearnerStep1Form } from '@/lib/onboarding-schemas'
import { GOAL_OPTIONS } from '@/constants/onboarding'
import { useSaveLearnerStep1 } from '@/hooks/use-onboarding'
import { cn } from '@/lib/utils'

export function LearnerStep1Form(): React.ReactElement {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
  const { mutateAsync, isPending } = useSaveLearnerStep1()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<LearnerStep1Form>({
    resolver: zodResolver(learnerStep1Schema),
    mode: 'onChange',
  })

  const fullName = watch('fullName')
  const canSubmit = fullName?.length >= 2 && !!selectedGoal && !isPending

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useGSAP(() => {
    if (!containerRef.current) return
    gsap.from(containerRef.current, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' })
    gsap.from('.goal-card', { opacity: 0, y: 12, stagger: 0.04, duration: 0.35, ease: 'power2.out', delay: 0.15 })
  }, [])

  const onSubmit = async (data: LearnerStep1Form) => {
    try {
      await mutateAsync(data)
      const match = document.cookie.match(/creonex_redirect_url=([^;]+)/)
      const redirectUrl = match ? decodeURIComponent(match[1]) : '/explore'
      router.push(redirectUrl)
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div ref={containerRef} className="w-full max-w-[28rem] space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <OnboardingProgressBar currentStep={1} totalSteps={1} label="About you" />

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
            <label className="text-sm font-medium">What brings you to Creonex?</label>
            <p className="mt-0.5 text-xs text-muted-foreground">Pick your main goal</p>
          </div>
          <Controller
            name="goalType"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-2">
                {GOAL_OPTIONS.map((opt) => {
                  const isSelected = field.value === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        field.onChange(opt.value)
                        setSelectedGoal(opt.value)
                      }}
                      className={cn(
                        'goal-card flex items-center gap-3 rounded-lg border p-3 text-left transition-all duration-150',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        isSelected
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border bg-background text-foreground hover:border-primary/50',
                      )}
                    >
                      <FontAwesomeIcon
                        icon={opt.icon}
                        className={cn('size-4 shrink-0', isSelected ? 'text-primary' : 'text-muted-foreground')}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-tight">{opt.label}</p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground leading-tight">{opt.description}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          />
        </div>

        <Button type="submit" className="w-full gap-2" disabled={!canSubmit}>
          {isPending ? (
            <FontAwesomeIcon icon={faSpinner} className="size-4 animate-spin" />
          ) : (
            <FontAwesomeIcon icon={faMagnifyingGlass} className="size-4" />
          )}
          {isPending ? 'Finding your mentors…' : 'Find my mentors'}
        </Button>
      </form>
    </div>
  )
}
