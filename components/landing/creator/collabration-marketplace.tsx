"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faMagnifyingGlass,
  faFileLines,
  faHandshake,
  faRocket,
  faCoins,
  faUsers,
  faLaptopCode,
  faBullhorn,
  faLink,
} from '@fortawesome/free-solid-svg-icons'

const STEPS = [
  { num: '01', icon: faMagnifyingGlass, title: 'Discover',  desc: 'Filter by niche & audience'     },
  { num: '02', icon: faFileLines,       title: 'Propose',   desc: 'Set revenue split & timeline'   },
  { num: '03', icon: faHandshake,       title: 'Negotiate', desc: 'Agree on terms securely'        },
  { num: '04', icon: faRocket,          title: 'Launch',    desc: 'Publish joint offerings'        },
  { num: '05', icon: faCoins,           title: 'Auto-Split',desc: 'Zero manual payouts'            },
]

const USE_CASES: { icon: IconDefinition; title: string; desc: string }[] = [
  { icon: faUsers,      title: 'Co-Created Courses', desc: 'Shared ownership and joint distribution for massive reach.'        },
  { icon: faLaptopCode, title: 'Joint Webinars',     desc: 'Combine your audiences for a massive live event.'                  },
  { icon: faBullhorn,   title: 'Affiliate Selling',  desc: 'Let other creators promote your courses for a commission.'        },
  { icon: faLink,       title: 'Cross-Referrals',    desc: 'Automatically earn rewards for sending leads to peers.'           },
]

export default function CollaborationMarketplace(): React.ReactElement {
  return (
    <section className="bg-background py-24 md:py-32 relative overflow-hidden border-t border-border/10">
      <div className="page-container relative z-10">

        {/* ── Header ── */}
        <div className="mb-20 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Coming Soon · First in India</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight font-display">
            The creator economy's<br />
            <span className="text-muted-foreground font-medium">missing layer — built.</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed font-light max-w-2xl">
            A structured marketplace to discover, negotiate, and launch collaborations. Let the platform automatically route revenue to everyone involved.
          </p>
        </div>

        {/* ── Collaboration Diagram ── */}
        <div className="w-full bg-card border border-border/50 rounded-3xl p-8 md:p-14 shadow-xl mb-16 relative overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">

            {/* Three-column: Creator A — Joint Product — Creator B */}
            <div className="flex w-full items-center justify-between gap-4 mb-4">

              {/* Creator A */}
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/25 flex items-center justify-center text-xl font-bold text-primary shadow-md">
                  AS
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Anya Sen</p>
                  <p className="text-xs text-muted-foreground">UI/UX Designer</p>
                </div>
                <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary">
                  60% split
                </span>
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 text-sm font-bold">
                  ₹6,000 / sale
                </div>
              </div>

              {/* Connecting lines */}
              <div className="flex-1 border-t-2 border-dashed border-primary/30" />

              {/* Center: Joint Product */}
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <FontAwesomeIcon icon={faRocket} className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-bold text-foreground uppercase tracking-widest">Joint Masterclass</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Total: ₹10,000 / sale</p>
                </div>
              </div>

              {/* Connecting lines */}
              <div className="flex-1 border-t-2 border-dashed border-primary/30" />

              {/* Creator B */}
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/25 flex items-center justify-center text-xl font-bold text-primary shadow-md">
                  RV
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Rohan Verma</p>
                  <p className="text-xs text-muted-foreground">React Developer</p>
                </div>
                <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary">
                  40% split
                </span>
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 text-sm font-bold">
                  ₹4,000 / sale
                </div>
              </div>

            </div>

            {/* Auto-split note */}
            <p className="mt-6 text-center text-xs text-muted-foreground/60 font-medium">
              Both wallets receive their cut automatically on every purchase — no manual transfers.
            </p>

          </div>
        </div>

        {/* ── Workflow Stepper ── */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {STEPS.map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-12 h-12 rounded-full bg-background border border-border/50 flex items-center justify-center text-primary shadow-sm">
                    <FontAwesomeIcon icon={step.icon} className="w-5 h-5" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary text-[9px] font-extrabold text-primary-foreground flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <h4 className="text-[13px] font-bold text-foreground mb-1 uppercase tracking-wider">{step.title}</h4>
                <p className="text-[12px] text-muted-foreground font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Use Cases ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USE_CASES.map((uc) => (
            <div key={uc.title} className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm hover:border-primary/30 transition-colors group">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-border/60 bg-muted/40 text-muted-foreground transition-all duration-200 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                <FontAwesomeIcon icon={uc.icon} className="size-4" />
              </div>
              <h4 className="text-[15px] font-bold text-foreground mb-2">{uc.title}</h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed font-light">{uc.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
