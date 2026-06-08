'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHandshake,
  faSearch,
  faFileContract,
  faRocket,
  faCoins,
  faUsers,
  faLaptopCode,
  faBullhorn,
  faLink,
  faWallet,
  faCartShopping,
  faCheckCircle,
  faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons'

const STEPS = [
  { icon: faSearch,       label: 'Discover', desc: 'Browse creators by niche, audience size, and expertise'  },
  { icon: faHandshake,    label: 'Connect',  desc: 'Send a proposal and align on shared goals'               },
  { icon: faFileContract, label: 'Agree',    desc: 'Set your revenue split and sign terms digitally'         },
  { icon: faRocket,       label: 'Launch',   desc: 'Go live together — Creonex handles checkout'             },
  { icon: faCoins,        label: 'Earn',     desc: 'Payouts routed to each wallet automatically'             },
]

const FORMATS = [
  { icon: faUsers,      title: 'Co-Created Courses',   hint: 'Multi-instructor programs'    },
  { icon: faLaptopCode, title: 'Joint Bootcamps',       hint: 'Shared live cohorts'          },
  { icon: faBullhorn,   title: 'Affiliate Networks',    hint: 'Commission-based selling'     },
  { icon: faLink,       title: 'Cross-Referrals',       hint: 'Auto split referral rewards'  },
  { icon: faRocket,     title: 'Joint Masterclasses',   hint: 'Ticket sales auto-split'      },
  { icon: faWallet,     title: 'Curated Bundles',        hint: 'High-value collections'       },
  { icon: faCoins,      title: 'Sponsored Promos',      hint: 'Shared sponsor payouts'       },
  { icon: faHandshake,  title: 'Community Access',      hint: 'Paid joint communities'       },
]

export default function CollaborationMarketplace(): React.ReactElement {
  const [splitRatio, setSplitRatio] = useState(60)
  const [salesCount, setSalesCount] = useState(148)
  const [totalRevenue, setTotalRevenue] = useState(1480000)
  const [anyaEarnings, setAnyaEarnings] = useState(888000)
  const [rohanEarnings, setRohanEarnings] = useState(592000)
  const [anyaHistory, setAnyaHistory] = useState([5000, 6000, 4500, 7000, 6000])
  const [rohanHistory, setRohanHistory] = useState([3500, 4000, 3000, 5000, 4000])
  const [isSimulating, setIsSimulating] = useState(false)
  const [topParticleActive, setTopParticleActive] = useState(false)
  const [bottomParticlesActive, setBottomParticlesActive] = useState(false)
  const [routerPulsing, setRouterPulsing] = useState(false)
  const [walletsPulsing, setWalletsPulsing] = useState(false)

  const triggerSimulation = () => {
    if (isSimulating) return
    setIsSimulating(true)
    setTopParticleActive(true)
    setTimeout(() => { setTopParticleActive(false); setRouterPulsing(true) }, 400)
    setTimeout(() => { setRouterPulsing(false); setBottomParticlesActive(true) }, 550)
    setTimeout(() => {
      setBottomParticlesActive(false)
      setWalletsPulsing(true)
      const saleAmount = 10000
      const splitA = (saleAmount * splitRatio) / 100
      const splitB = saleAmount - splitA
      setSalesCount(prev => prev + 1)
      setTotalRevenue(prev => prev + saleAmount)
      setAnyaEarnings(prev => prev + splitA)
      setRohanEarnings(prev => prev + splitB)
      setAnyaHistory(prev => [...prev.slice(1), splitA])
      setRohanHistory(prev => [...prev.slice(1), splitB])
    }, 1050)
    setTimeout(() => { setWalletsPulsing(false); setIsSimulating(false) }, 1800)
  }

  useEffect(() => {
    if (isSimulating) return
    const timer = setInterval(triggerSimulation, 9000)
    return () => clearInterval(timer)
  }, [isSimulating, splitRatio])

  return (
    <section className="relative overflow-hidden border-t border-border/10 bg-background py-24 md:py-32">

      {/* Ambient glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[450px] w-[450px] translate-x-1/2 translate-y-1/2 rounded-full bg-foreground/5 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4">

        {/* ── HEADER ──────────────────────────────────── */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 font-sans text-[10px] font-extrabold uppercase tracking-widest text-primary">
            Coming Soon · First in India
          </span>

          <h2 className="font-display text-4xl font-black leading-tight tracking-tight text-foreground md:text-5xl lg:text-[54px]">
            Partner with creators.<br />
            <span className="text-primary">Earn your share, automatically.</span>
          </h2>

          {/* Feature pills — no paragraphs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {['Co-Created Courses', 'Auto Revenue Split', 'Instant Bank Payouts', 'Legally Binding Terms', 'Zero Manual Work'].map((pill) => (
              <span key={pill} className="rounded-full border border-border/60 bg-card px-3.5 py-1.5 font-sans text-xs font-medium text-muted-foreground">
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* ── INTERACTIVE DEMO ────────────────────────── */}
        <div className="mb-20 grid grid-cols-1 gap-6 lg:grid-cols-12">

          {/* Visual canvas — 7 cols */}
          <div className="relative flex min-h-[480px] items-center justify-center overflow-hidden rounded-3xl border border-border/80 bg-muted/20 p-6 lg:col-span-7">

            {/* Grid pattern */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_50%/0.04)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_50%/0.04)_1px,transparent_1px)] bg-size-[24px_24px]" />

            {/* SVG connector paths */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 50,18 L 50,42" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.6" />
              <path d="M 50,42 C 50,55 25,55 25,78" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.6" />
              <path d="M 50,42 C 50,55 75,55 75,78" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.6" />
            </svg>

            {/* Top → Router particle */}
            {topParticleActive && (
              <motion.div
                className="pointer-events-none absolute z-30 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"
                initial={{ left: '50%', top: '18%', opacity: 0 }}
                animate={{ top: '42%', opacity: [0, 1, 1] }}
                transition={{ type: 'tween', ease: 'easeIn', duration: 0.4 }}
              />
            )}

            {/* Router → Wallets particles */}
            {bottomParticlesActive && (
              <>
                <motion.div
                  className="pointer-events-none absolute z-30 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"
                  initial={{ left: '50%', top: '42%', opacity: 0 }}
                  animate={{ left: ['50%','47.4%','41.2%','33.8%','27.6%','25%'], top: ['42%','48.5%','53.4%','58.3%','64.6%','74%'], opacity: [0,1,1,1,1,1] }}
                  transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
                />
                <motion.div
                  className="pointer-events-none absolute z-30 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"
                  initial={{ left: '50%', top: '42%', opacity: 0 }}
                  animate={{ left: ['50%','52.6%','58.8%','66.2%','72.4%','75%'], top: ['42%','48.5%','53.4%','58.3%','64.6%','74%'], opacity: [0,1,1,1,1,1] }}
                  transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
                />
              </>
            )}

            {/* Checkout card */}
            <div className="absolute left-1/2 top-[5%] z-20 w-[76%] -translate-x-1/2 sm:w-[54%]">
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/90 p-3.5 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-sm">
                    <FontAwesomeIcon icon={faRocket} className="size-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Checkout</span>
                    <h4 className="font-display text-xs font-bold text-foreground">Design-to-Code Bootcamp</h4>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-muted px-2.5 py-1.5 font-mono text-xs font-bold text-foreground whitespace-nowrap">₹10,000</div>
              </div>
            </div>

            {/* Split router node */}
            <div className="absolute left-1/2 top-[42%] z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <motion.div
                animate={routerPulsing ? { scale: 1.18, borderColor: 'var(--color-primary)' } : { scale: 1, borderColor: 'var(--color-border)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="relative flex size-14 cursor-pointer items-center justify-center rounded-full border bg-background shadow-lg"
                onClick={triggerSimulation}
              >
                <div className="absolute inset-0.5 animate-[spin_10s_linear_infinite] rounded-full border border-dashed border-primary/30" />
                <AnimatePresence>
                  {routerPulsing && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.25 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'tween', duration: 0.15 }}
                      className="absolute inset-0 -z-10 rounded-full border border-primary/25 bg-primary/10 blur-sm"
                    />
                  )}
                </AnimatePresence>
                <FontAwesomeIcon icon={faCoins} className={`relative z-10 size-5 text-primary transition-transform duration-300 ${routerPulsing ? 'rotate-12 scale-110' : ''}`} />
              </motion.div>
              <span className="mt-2 rounded-full border border-border bg-background px-2.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-widest text-primary shadow-sm">
                Split Router
              </span>
            </div>

            {/* Wallet cards */}
            <div className="absolute bottom-[4%] left-0 right-0 flex justify-between gap-3 px-4 sm:px-8">
              {[
                { key: 'AS', name: 'Anya',  pct: splitRatio,       earnings: anyaEarnings,  payout: (10000 * splitRatio) / 100         },
                { key: 'RV', name: 'Rohan', pct: 100 - splitRatio, earnings: rohanEarnings, payout: (10000 * (100 - splitRatio)) / 100 },
              ].map((c) => (
                <div key={c.key} className="relative w-[47%] overflow-hidden rounded-2xl border border-border/70 bg-card p-3.5 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-primary/40 hover:shadow-[0_8px_28px_-8px_rgba(var(--primary-rgb),0.15)]">

                  {/* Subtle teal gradient wash */}
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/3 to-transparent" />

                  {/* Payout popup */}
                  <AnimatePresence>
                    {walletsPulsing && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.8 }}
                        animate={{ opacity: 1, y: -22, scale: 1.1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-1.5 left-1/2 z-30 -translate-x-1/2 rounded-full border border-border bg-foreground px-2.5 py-1 font-mono text-[10px] font-bold text-background shadow-lg"
                      >
                        +₹{c.payout.toLocaleString()}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Header */}
                  <div className="relative mb-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-[10px] font-extrabold text-primary shadow-sm">
                        {c.key}
                      </div>
                      <div>
                        <h4 className="font-display text-[11px] font-bold leading-none text-foreground">{c.name}</h4>
                        <span className="font-sans text-[9px] text-muted-foreground/60">Creator</span>
                      </div>
                    </div>
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-[9px] font-bold text-primary">{c.pct}%</span>
                  </div>

                  <div className="relative mb-2.5 h-px bg-border/50" />

                  {/* Earnings */}
                  <div className="relative">
                    <span className="block font-sans text-[8px] font-bold uppercase tracking-widest text-muted-foreground/60">Total Routed</span>
                    <div className="mt-1 flex items-center justify-between gap-1">
                      <span className="truncate font-mono text-sm font-black text-foreground">₹{c.earnings.toLocaleString()}</span>
                      <div className="flex shrink-0 items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-1.5 py-0.5">
                        <FontAwesomeIcon icon={faArrowTrendUp} className="size-2.5 text-primary" />
                        <span className="font-mono text-[8px] font-bold text-primary">Live</span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Config panel — 5 cols */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/85 bg-card/45 p-6 shadow-xl backdrop-blur-xl md:p-7 lg:col-span-5">
            <div className="pointer-events-none absolute right-0 top-0 size-24 rounded-full bg-primary/5 blur-2xl" />

            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <span className="mb-1 block font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Interactive Sandbox</span>
                  <h3 className="font-display text-xl font-bold text-foreground">Split Agreement</h3>
                </div>
                <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-muted text-foreground/80">
                  <FontAwesomeIcon icon={faFileContract} className="size-4" />
                </div>
              </div>

              {/* Creator rows */}
              <div className="mb-6 space-y-3 font-sans">
                {[
                  { initials: 'AS', name: 'Anya Sen',    role: 'UI/UX Designer',  pct: splitRatio       },
                  { initials: 'RV', name: 'Rohan Verma', role: 'React Developer', pct: 100 - splitRatio },
                ].map((c) => (
                  <div key={c.initials} className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/50 p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-bold text-primary shadow-sm">{c.initials}</div>
                      <div>
                        <h4 className="text-sm font-bold leading-tight text-foreground">{c.name}</h4>
                        <span className="text-xs text-muted-foreground">{c.role}</span>
                      </div>
                    </div>
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary">{c.pct}%</span>
                  </div>
                ))}
              </div>

              {/* Slider */}
              <div className="mb-6 rounded-2xl border border-border/60 bg-muted/40 p-4 dark:bg-muted/15">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground">Split Ratio</span>
                  <span className="rounded border border-border bg-background px-2.5 py-0.5 font-mono text-sm font-bold text-foreground">{splitRatio}:{100 - splitRatio}</span>
                </div>
                <div className="relative flex h-8 select-none items-center">
                  <div className="absolute left-0 right-0 flex h-2.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-primary" style={{ width: `${splitRatio}%` }} />
                    <div className="h-full bg-muted-foreground/30" style={{ width: `${100 - splitRatio}%` }} />
                  </div>
                  <input
                    type="range" min="10" max="90" value={splitRatio}
                    onChange={(e) => setSplitRatio(Number(e.target.value))}
                    disabled={isSimulating}
                    className="relative z-10 h-8 w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                  />
                  <div
                    className="pointer-events-none absolute -ml-3 flex size-6 items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg"
                    style={{ left: `${splitRatio}%` }}
                  >
                    <div className="size-2.5 rounded-full bg-primary" />
                  </div>
                </div>
              </div>

              {/* Terms checklist */}
              <div className="mb-6 space-y-2 font-sans">
                {['Automatic tax split calculations', 'Legally binding digital terms', 'Direct-to-bank payout routing'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FontAwesomeIcon icon={faCheckCircle} className="size-3.5 shrink-0 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={triggerSimulation}
                disabled={isSimulating}
                className="flex h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-foreground font-sans text-sm font-bold text-background shadow-md transition-all duration-300 hover:bg-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faCartShopping} className={`${isSimulating ? 'animate-bounce' : ''} text-sm`} />
                {isSimulating ? 'Processing Split…' : 'Simulate Purchase  ₹10,000'}
              </button>

              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border/80 pt-5 font-sans">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Joint Sales</span>
                  <span className="mt-0.5 block font-mono text-base font-bold text-foreground">{salesCount} Purchases</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Split</span>
                  <span className="mt-0.5 block font-mono text-base font-bold text-foreground">₹{totalRevenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* ── HOW IT WORKS ── */}

        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-muted/20 px-6 py-12 md:px-10 md:py-14">
          <div className="pointer-events-none absolute left-1/2 top-0 h-55 w-125 -translate-x-1/2 bg-primary/4 blur-[100px]" />

          <div className="relative mb-12 text-center">
            <p className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
              The process
            </p>
            <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              From idea to earnings in 5 steps
            </h3>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[10%] right-[10%] top-10 hidden h-px bg-linear-to-r from-transparent via-border to-transparent md:block" />

            <div className="relative z-10 grid grid-cols-2 gap-6 sm:grid-cols-5 sm:gap-3">
              {STEPS.map((step, i) => (
                <div key={step.label} className="group flex flex-col items-center text-center">
                  <div className="relative mb-5 shrink-0">
                    <div className="flex size-20 items-center justify-center rounded-2xl border border-border/60 bg-card shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-[0_10px_28px_-8px_rgba(var(--primary-rgb),0.18)]">
                      <FontAwesomeIcon icon={step.icon} className="size-6 text-muted-foreground/70 transition-colors duration-300 group-hover:text-primary" />
                    </div>
                    <span className="absolute -right-1.5 -top-1.5 flex size-5.5 items-center justify-center rounded-full bg-primary text-[9px] font-extrabold text-primary-foreground shadow-sm">
                      {i + 1}
                    </span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
                    {step.label}
                  </h4>
                  {/* <p className="mt-1.5 font-sans text-[11px] leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
  


        {/* ── COLLABORATION FORMATS GRID ──────────────── */}
        
        {/* <div>
          <p className="mb-10 text-center font-sans text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            What you can build together
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {FORMATS.map((fmt) => (
              <div
                key={fmt.title}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-[0_8px_24px_-8px_rgba(var(--primary-rgb),0.15)]"
              >
                <div className="mb-3 flex size-11 items-center justify-center rounded-xl border border-border bg-muted text-foreground/80 transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <FontAwesomeIcon icon={fmt.icon} className="size-4.5" />
                </div>
                <h4 className="font-display text-sm font-bold text-foreground">{fmt.title}</h4>
                <p className="mt-1 font-sans text-[11px] leading-snug text-muted-foreground">{fmt.hint}</p>
              </div>
            ))}
          </div>
        </div> */}

      </div>
    </section>
  )
}
