"use client";

import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Apple, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MobileAppSection() {
  return (
    <section className="bg-background py-24 relative overflow-hidden border-t border-border/10">
      <div className="page-container max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Side: Minimal Copy */}
          <div className="flex-1 max-w-xl text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 text-primary">
               <Smartphone className="w-4 h-4" />
               <span className="text-xs font-bold uppercase tracking-widest">Coming 2026</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-[54px] font-medium tracking-tight text-foreground mb-6 leading-tight">
              Your entire creator business. <br className="hidden md:block"/> In your pocket.
            </h2>
            
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
              Manage bookings, track live earnings, and engage with your community from a single, beautifully designed application. No laptop required.
            </p>

            {/* Simple Feature List */}
            <ul className="space-y-5 mb-12 text-left max-w-md mx-auto lg:mx-0">
               <li className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                  <span className="font-medium text-foreground/80">Live earnings and session analytics</span>
               </li>
               <li className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                  <span className="font-medium text-foreground/80">Accept and manage bookings on the fly</span>
               </li>
               <li className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                  <span className="font-medium text-foreground/80">Built-in community messaging</span>
               </li>
            </ul>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
               <Button size="lg" className="rounded-full px-8 gap-2 font-medium bg-foreground text-background hover:bg-foreground/90 h-12">
                 Join Waitlist <ArrowRight className="h-4 w-4" />
               </Button>
               
               <div className="flex items-center gap-4 opacity-40 grayscale pointer-events-none">
                  <Apple className="h-6 w-6" />
                  <Play className="h-5 w-5" />
               </div>
            </div>
          </div>

          {/* Right Side: Ultra-Minimal Abstract Mockup with Hardware Frame */}
          <div className="flex-1 w-full max-w-md relative flex justify-center lg:justify-end">
            <motion.div 
               animate={{ y: [-8, 8, -8] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="relative w-[280px] h-[580px] bg-card border-[10px] md:border-[12px] border-neutral-200 dark:border-neutral-900 rounded-[3rem] shadow-2xl flex flex-col overflow-hidden ring-1 ring-border/50"
            >
               {/* Hardware Details (Volume/Power Buttons) */}
               <div className="absolute top-28 -left-3 w-3 h-10 bg-neutral-300 dark:bg-neutral-800 rounded-l-sm" />
               <div className="absolute top-44 -left-3 w-3 h-14 bg-neutral-300 dark:bg-neutral-800 rounded-l-sm" />
               <div className="absolute top-36 -right-3 w-3 h-16 bg-neutral-300 dark:bg-neutral-800 rounded-r-sm" />

               {/* Dynamic Island */}
               <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-50 flex items-center justify-between px-2.5 shadow-inner">
                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-900/50 flex items-center justify-center">
                    <div className="h-0.5 w-0.5 rounded-full bg-emerald-500" />
                 </div>
                 <div className="h-2 w-2 rounded-full bg-[#1a1a1a]" />
               </div>

               {/* Sleek Header */}
               <div className="w-full pt-16 pb-8 px-6 flex flex-col items-center">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Total Balance</p>
                  <h3 className="text-4xl font-light text-foreground tracking-tight">₹1,42,500</h3>
               </div>

               {/* Clean Graph Area */}
               <div className="w-full h-32 relative flex items-end px-4 gap-2.5 pb-2">
                   <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
                   {[20, 35, 25, 50, 45, 75, 60, 40, 85, 70].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${h}%` }}></div>
                   ))}
               </div>

               {/* Simple Abstract List Items */}
               <div className="flex-1 w-full p-6 space-y-6 mt-4">
                  {[1, 2, 3].map((_, i) => (
                     <div key={i} className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-muted/50" />
                           <div className="space-y-2">
                              <div className="w-24 h-2 bg-muted/80 rounded-full" />
                              <div className="w-12 h-1.5 bg-muted/40 rounded-full" />
                           </div>
                        </div>
                        <div className="w-12 h-2 bg-primary/20 rounded-full" />
                     </div>
                  ))}
               </div>
               
               {/* Minimal Home Indicator */}
               <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-border/50 rounded-full z-50" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
