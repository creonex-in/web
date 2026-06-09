"use client";

import { motion } from "framer-motion";
import { Handshake, Search, FileText, Rocket, Coins, Users, Laptop, Megaphone, Link as LinkIcon } from "lucide-react";

const steps = [
   { icon: Search, title: "Discover", desc: "Filter by niche & audience" },
   { icon: FileText, title: "Propose", desc: "Set revenue split & timeline" },
   { icon: Handshake, title: "Negotiate", desc: "Agree on terms securely" },
   { icon: Rocket, title: "Launch", desc: "Publish joint offerings" },
   { icon: Coins, title: "Auto-Split", desc: "Zero manual payouts" },
];

const useCases = [
   { icon: Users, title: "Co-Created Courses", desc: "Shared ownership and joint distribution for massive reach." },
   { icon: Laptop, title: "Joint Webinars", desc: "Combine your audiences for a massive live event." },
   { icon: Megaphone, title: "Affiliate Selling", desc: "Let other creators promote your courses for a commission." },
   { icon: LinkIcon, title: "Cross-Referrals", desc: "Automatically earn rewards for sending leads to peers." },
];

export default function CollaborationMarketplace() {
   return (
      <section className="bg-background py-24 md:py-32 relative overflow-hidden border-t border-border/10">
         <div className="page-container max-w-6xl relative z-10">

            {/* Header */}
            <div className="mb-20 flex flex-col items-center text-center max-w-3xl mx-auto">
               <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 shadow-sm shadow-primary/20">
                  <span className="h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">Coming Soon • First in India</span>
               </div>

               <h2 className="text-4xl md:text-5xl lg:text-[54px] font-medium tracking-tight text-foreground mb-6 leading-tight">
                  The creator economy's<br />
                  <span className="text-muted-foreground">missing layer — built.</span>
               </h2>

               <p className="text-lg text-muted-foreground leading-relaxed font-light max-w-2xl">
                  A structured marketplace to discover, negotiate, and launch collaborations. Stop trusting handshake deals and let the platform automatically route revenue to everyone involved.
               </p>
            </div>

            {/* The Collaboration Node Diagram */}
            <div className="w-full bg-card border border-border/50 rounded-3xl p-8 md:p-16 shadow-xl mb-16 relative overflow-hidden flex flex-col items-center justify-center">
               {/* Minimal Background Grid Pattern */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

               <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">

                  {/* Top Row: Creators linking */}
                  <div className="flex w-full items-center justify-between relative mb-12">
                     {/* Connecting Dashed Line */}
                     <div className="absolute top-1/2 left-[15%] right-[15%] -translate-y-1/2 border-t-2 border-dashed border-primary/30 z-0">
                        {/* Animated Line flow */}
                        <motion.div
                           animate={{ x: ["0%", "100%"] }}
                           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                           className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent via-primary/60 to-transparent -translate-y-[2px]"
                        />
                     </div>

                     {/* Creator A */}
                     <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-background border border-border/50 flex items-center justify-center shadow-lg">
                           <span className="text-xl font-light text-foreground">A</span>
                        </div>
                        <div className="mt-3 bg-background border border-border/50 px-3 py-1 rounded-full text-xs font-semibold text-muted-foreground">60% Split</div>
                     </div>

                     {/* The Joint Product */}
                     <div className="relative z-10 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                           <Rocket className="w-10 h-10 text-primary-foreground" />
                        </div>
                        <div className="mt-4 text-[11px] font-bold text-foreground uppercase tracking-widest bg-background/50 backdrop-blur-md px-3 py-1 rounded-full border border-border/50">Joint Masterclass</div>
                     </div>

                     {/* Creator B */}
                     <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-background border border-border/50 flex items-center justify-center shadow-lg">
                           <span className="text-xl font-light text-foreground">B</span>
                        </div>
                        <div className="mt-3 bg-background border border-border/50 px-3 py-1 rounded-full text-xs font-semibold text-muted-foreground">40% Split</div>
                     </div>
                  </div>

                  {/* Bottom Row: Payout Distribution */}
                  <div className="flex w-full items-center justify-center gap-24">
                     <div className="flex flex-col items-center">
                        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="h-10 w-px bg-emerald-500/50 mb-2" />
                        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-4 py-1.5 rounded-lg font-bold text-lg shadow-sm">
                           ₹60,000
                        </div>
                     </div>
                     <div className="flex flex-col items-center">
                        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="h-10 w-px bg-emerald-500/50 mb-2" />
                        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-4 py-1.5 rounded-lg font-bold text-lg shadow-sm">
                           ₹40,000
                        </div>
                     </div>
                  </div>

               </div>
            </div>

            {/* Workflow Stepper */}
            <div className="mb-16">
               <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {steps.map((step, i) => (
                     <div key={i} className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-background border border-border/50 flex items-center justify-center mb-4 text-primary shadow-sm">
                           <step.icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-[13px] font-bold text-foreground mb-1 uppercase tracking-wider">{step.title}</h4>
                        <p className="text-[12px] text-muted-foreground font-medium">{step.desc}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* Use Cases Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {useCases.map((useCase, i) => (
                  <div key={i} className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm hover:border-primary/30 transition-colors group">
                     <useCase.icon className="w-5 h-5 text-primary mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                     <h4 className="text-[15px] font-bold text-foreground mb-2">{useCase.title}</h4>
                     <p className="text-[13px] text-muted-foreground leading-relaxed font-light">{useCase.desc}</p>
                  </div>
               ))}
            </div>

         </div>
      </section>
   );
}