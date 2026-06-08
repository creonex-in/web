"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faPlus,
  faCartShopping,
  faCheckCircle,
  faArrowTrendUp
} from "@fortawesome/free-solid-svg-icons";

const steps = [
  { icon: faSearch, title: "Discover", desc: "Find peers in complementary niches" },
  { icon: faHandshake, title: "Connect", desc: "Align on course structure or bundle" },
  { icon: faFileContract, title: "Contract", desc: "Set splits securely in 2 minutes" },
  { icon: faRocket, title: "Launch", desc: "Single checkout, joint distribution" },
  { icon: faCoins, title: "Auto-Split", desc: "Earnings routed directly to banks" },
];

const row1Items = [
  { icon: faUsers, title: "Co-Created Courses", desc: "Combine expertise to launch comprehensive, multi-instructor programs." },
  { icon: faLaptopCode, title: "Joint Bootcamps", desc: "Host live cohort-based bootcamps and share the live teaching load." },
  { icon: faBullhorn, title: "Affiliate Networks", desc: "Recruit other creators to sell your curriculum for a direct commission." },
  { icon: faLink, title: "Cross-Referrals", desc: "Recommend related creators and automatically earn split referral rewards." },
];

const row2Items = [
  { icon: faRocket, title: "Joint Masterclasses", desc: "Co-host live sessions and instantly split ticket sales at checkout." },
  { icon: faWallet, title: "Curated Bundles", desc: "Merge individual courses and templates into high-value bundles." },
  { icon: faCoins, title: "Sponsored Promos", desc: "Partner on sponsorship spots and split sponsor payouts instantly." },
  { icon: faHandshake, title: "Community Access", desc: "Launch a joint paid community hub with shared moderation." },
];

export default function CollaborationMarketplace(): React.ReactElement {
  // Configurable dynamic states
  const [splitRatio, setSplitRatio] = useState(60); // Anya's split (60%)
  const [salesCount, setSalesCount] = useState(148);
  const [totalRevenue, setTotalRevenue] = useState(1480000);
  const [anyaEarnings, setAnyaEarnings] = useState(888000); // 60% of total
  const [rohanEarnings, setRohanEarnings] = useState(592000); // 40% of total

  // Historical lists for rendering dynamic micro charts
  const [anyaHistory, setAnyaHistory] = useState([5000, 6000, 4500, 7000, 6000]);
  const [rohanHistory, setRohanHistory] = useState([3500, 4000, 3000, 5000, 4000]);

  // Simulation Stage states
  const [isSimulating, setIsSimulating] = useState(false);
  const [topParticleActive, setTopParticleActive] = useState(false);
  const [bottomParticlesActive, setBottomParticlesActive] = useState(false);
  const [routerPulsing, setRouterPulsing] = useState(false);
  const [walletsPulsing, setWalletsPulsing] = useState(false);

  const triggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    
    // Stage 1: Send particle from checkout to Split Router (0.4s travel duration)
    setTopParticleActive(true);

    // Reaches Router at 0.4s
    setTimeout(() => {
      setTopParticleActive(false);
      setRouterPulsing(true);
    }, 400);

    // Split animation completes, start payout branching particles at 0.55s (150ms processing pause)
    setTimeout(() => {
      setRouterPulsing(false);
      setBottomParticlesActive(true);
    }, 550);

    // Reaches Wallets at 1.05s (0.5s travel duration)
    setTimeout(() => {
      setBottomParticlesActive(false);
      setWalletsPulsing(true);

      const saleAmount = 10000;
      const splitA = (saleAmount * splitRatio) / 100;
      const splitB = saleAmount - splitA;

      setSalesCount(prev => prev + 1);
      setTotalRevenue(prev => prev + saleAmount);
      setAnyaEarnings(prev => prev + splitA);
      setRohanEarnings(prev => prev + splitB);

      // Append new split values to visual history bar graphs
      setAnyaHistory(prev => [...prev.slice(1), splitA]);
      setRohanHistory(prev => [...prev.slice(1), splitB]);
    }, 1050);

    // Reset animation state at 1.8s (750ms wallet feedback duration)
    setTimeout(() => {
      setWalletsPulsing(false);
      setIsSimulating(false);
    }, 1800);
  };

  // Auto-run simulation on loop for visual demo
  useEffect(() => {
    if (isSimulating) return;
    const timer = setInterval(() => {
      triggerSimulation();
    }, 9000);
    return () => clearInterval(timer);
  }, [isSimulating, splitRatio]);

  // Duplicated items for a seamless infinite scroll loop
  const duplicatedRow1 = [...row1Items, ...row1Items];
  const duplicatedRow2 = [...row2Items, ...row2Items];

  return (
    <section className="bg-background py-24 md:py-32 relative overflow-hidden border-t border-border/10">
      
      {/* Subtle, cool background glow backdrops using minimal neutral/primary blue tones */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] rounded-full bg-foreground/5 blur-[130px] pointer-events-none" />

      {/* Injecting CSS Keyframe Styles for Marquee Loop */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: scroll-left 40s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: scroll-right 40s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="page-container relative z-10">

        {/* Header */}
        <div className="mb-20 flex flex-col items-center text-center max-w-3xl mx-auto">
          <p className="text-label text-primary mb-5">Coming Soon • First in India</p>
          <h2 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-foreground mb-6 leading-tight tracking-tight font-display">
            Co-Create. Auto-Split.<br />
            <span className="text-primary">
              Zero manual payouts.
            </span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed font-light max-w-2xl font-sans">
            A structured marketplace to discover, negotiate, and launch joint offerings. Stop trusting handshake agreements and let the platform automatically route revenue to everyone involved at checkout.
          </p>
        </div>

        {/* Interactive Dashboard Sandbox */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 max-w-6xl mx-auto mb-20">
          
          {/* Left Column: Interactive Contract Controller */}
          <div className="lg:col-span-5 bg-card/45 backdrop-blur-xl border border-border/85 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Soft decorative accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1 font-sans">Interactive Sandbox</span>
                  <h3 className="text-xl font-bold text-foreground font-display">Split Agreement Settings</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-foreground/80">
                  <FontAwesomeIcon icon={faFileContract} className="w-4.5 h-4.5" />
                </div>
              </div>

              {/* Creators Info List */}
              <div className="space-y-4 mb-8 font-sans">
                {/* Creator A Info */}
                <div className="flex items-center justify-between p-3.5 bg-background/50 rounded-2xl border border-border/70">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-bold shadow-sm">
                      AS
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground leading-tight">Anya Sen</h4>
                      <span className="text-xs text-muted-foreground">UI/UX Designer</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary font-mono bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {splitRatio}% Share
                  </span>
                </div>

                {/* Creator B Info */}
                <div className="flex items-center justify-between p-3.5 bg-background/50 rounded-2xl border border-border/70">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-bold shadow-sm">
                      RV
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground leading-tight">Rohan Verma</h4>
                      <span className="text-xs text-muted-foreground">React Developer</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary font-mono bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {100 - splitRatio}% Share
                  </span>
                </div>
              </div>

              {/* Split Slider Control */}
              <div className="mb-8 p-4 bg-muted/40 dark:bg-muted/15 border border-border/60 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider font-sans">Adjust Split Ratio</span>
                  <span className="text-sm font-bold text-foreground font-mono bg-background px-2.5 py-0.5 rounded border border-border">
                    {splitRatio}:{100 - splitRatio}
                  </span>
                </div>
                
                <div className="relative flex items-center h-8 select-none">
                  {/* Range matching track beneath it */}
                  <div className="absolute h-2.5 left-0 right-0 rounded-full bg-muted overflow-hidden flex">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${splitRatio}%` }} 
                    />
                    <div 
                      className="h-full bg-muted-foreground/30" 
                      style={{ width: `${100 - splitRatio}%` }} 
                    />
                  </div>

                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={splitRatio}
                    onChange={(e) => setSplitRatio(Number(e.target.value))}
                    disabled={isSimulating}
                    className="w-full h-8 opacity-0 cursor-pointer relative z-10 disabled:cursor-not-allowed"
                  />

                  {/* Thumb overlay */}
                  <div 
                    className="absolute w-6 h-6 rounded-full bg-background border-2 border-primary shadow-lg flex items-center justify-center pointer-events-none -ml-3"
                    style={{ left: `${splitRatio}%` }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground mt-2 text-center font-sans">
                  Drag the slider. Contract splits route earnings dynamically at check-out.
                </p>
              </div>

              {/* Verified Badge Terms */}
              <div className="space-y-2 mb-8 font-sans">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-primary w-3.5 h-3.5" />
                  <span>Automatic tax split calculations ready</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-primary w-3.5 h-3.5" />
                  <span>Legally binding digital partnership terms</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-primary w-3.5 h-3.5" />
                  <span>Payout splits processed directly to banks</span>
                </div>
              </div>
            </div>

            <div>
              {/* Trigger Button */}
              <button
                onClick={triggerSimulation}
                disabled={isSimulating}
                className="w-full h-14 rounded-2xl bg-foreground hover:bg-muted-foreground text-background font-bold text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              >
                <FontAwesomeIcon 
                  icon={faCartShopping} 
                  className={`${isSimulating ? "animate-bounce" : ""} text-sm`} 
                />
                {isSimulating ? "Processing Split..." : "Simulate Customer Purchase (₹10,000)"}
              </button>

              {/* Dynamic stats preview */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-border/80 font-sans">
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">Joint Sales</span>
                  <span className="text-base font-bold text-foreground font-mono block mt-0.5">{salesCount} Purchases</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">Total Revenue split</span>
                  <span className="text-base font-bold text-foreground font-mono block mt-0.5">₹{totalRevenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Sandbox Canvas */}
          <div className="lg:col-span-7 bg-muted/20 border border-border/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between items-center relative overflow-hidden min-h-[460px] md:min-h-[500px]">
            {/* Grid Pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* SVG curves connector path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* S-Curves Background */}
              <path d="M 50,18 L 50,42" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.6" />
              <path d="M 50,42 C 50,55 25,55 25,74" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.6" />
              <path d="M 50,42 C 50,55 75,55 75,74" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.6" />
            </svg>

            {/* Animated HTML Particles (prevent oval stretching, enable premium shadow glow) */}
            {topParticleActive && (
              <motion.div
                className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)] pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2"
                initial={{ left: "50%", top: "18%", opacity: 0 }}
                animate={{ top: "42%", opacity: [0, 1, 1] }}
                transition={{ type: "tween", ease: "easeIn", duration: 0.4 }}
              />
            )}

            {bottomParticlesActive && (
              <>
                {/* Left Particle to Anya */}
                <motion.div
                  className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)] pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2"
                  initial={{ left: "50%", top: "42%", opacity: 0 }}
                  animate={{
                    left: ["50%", "47.4%", "41.2%", "33.8%", "27.6%", "25%"],
                    top: ["42%", "48.5%", "53.4%", "58.3%", "64.6%", "74%"],
                    opacity: [0, 1, 1, 1, 1, 1]
                  }}
                  transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
                />
                {/* Right Particle to Rohan */}
                <motion.div
                  className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)] pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2"
                  initial={{ left: "50%", top: "42%", opacity: 0 }}
                  animate={{
                    left: ["50%", "52.6%", "58.8%", "66.2%", "72.4%", "75%"],
                    top: ["42%", "48.5%", "53.4%", "58.3%", "64.6%", "74%"],
                    opacity: [0, 1, 1, 1, 1, 1]
                  }}
                  transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
                />
              </>
            )}

            {/* Top Element: Checkout Offering Card */}
            <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[75%] sm:w-[55%] z-20">
              <div className="bg-card/90 border border-border rounded-2xl p-3.5 shadow-lg flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                    <FontAwesomeIcon icon={faRocket} className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block font-sans">Checkout Product</span>
                    <h4 className="text-xs font-bold text-foreground truncate max-w-[120px] sm:max-w-[150px] font-display">Design-to-Code Bootcamp</h4>
                  </div>
                </div>
                <div className="bg-muted border border-border text-foreground px-2.5 py-1.5 rounded-xl font-mono text-xs font-bold whitespace-nowrap">
                  ₹10,000
                </div>
              </div>
            </div>

            {/* Middle Element: The Split Router Node */}
            <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              <motion.div
                animate={
                  routerPulsing 
                    ? { scale: 1.18, borderColor: "var(--color-primary)" } 
                    : { scale: 1, borderColor: "var(--color-border)" }
                }
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-14 h-14 rounded-full bg-background border flex items-center justify-center shadow-lg relative cursor-pointer"
                onClick={triggerSimulation}
              >
                {/* Outer spinning dash layer */}
                <div className="absolute inset-0.5 rounded-full border border-dashed border-primary/30 animate-[spin_10s_linear_infinite]" />
                
                {/* Animated colored ring glow */}
                <AnimatePresence>
                  {routerPulsing && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.25 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "tween", duration: 0.15 }}
                      className="absolute inset-0 rounded-full bg-primary/10 border border-primary/25 blur-sm -z-10" 
                    />
                  )}
                </AnimatePresence>

                <FontAwesomeIcon 
                  icon={faCoins} 
                  className={`w-5 h-5 text-primary relative z-10 transition-transform duration-300 ${routerPulsing ? "rotate-12 scale-110" : ""}`} 
                />
              </motion.div>
              <span className="text-[9px] font-bold text-primary uppercase tracking-widest mt-2 bg-background border border-border px-2.5 py-0.5 rounded-full shadow-sm font-sans">
                Split Router
              </span>
            </div>

            {/* Bottom Elements: Routed Wallets */}
            <div className="absolute bottom-[4%] left-0 right-0 flex justify-between px-4 sm:px-8 gap-4 font-sans">
              
              {/* Creator Card A (Anya Sen's Wallet) */}
              <div className="w-[47%] bg-card/90 border border-border rounded-2xl p-4 shadow-lg flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-primary/50">
                {/* Floating payout overlay */}
                <AnimatePresence>
                  {walletsPulsing && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.8 }}
                      animate={{ opacity: 1, y: -22, scale: 1.1 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-foreground text-background border border-border text-[10px] font-bold font-mono px-2.5 py-1 rounded-full shadow-lg z-30"
                    >
                      +₹{((10000 * splitRatio) / 100).toLocaleString()}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">
                        AS
                      </div>
                      <div className="hidden sm:block">
                        <h4 className="text-[11px] font-bold text-foreground leading-none">Anya</h4>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">
                      {splitRatio}%
                    </span>
                  </div>

                  <span className="text-[9px] text-muted-foreground block font-bold uppercase tracking-wider font-sans">Routed Earnings</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-sm sm:text-base font-bold text-foreground font-mono truncate">
                      ₹{anyaEarnings.toLocaleString()}
                    </span>
                    <FontAwesomeIcon icon={faArrowTrendUp} className="text-primary w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Micro Bar Chart */}
                <div className="flex items-end justify-between h-7 gap-1 mt-3 px-0.5 border-t border-border/50 pt-2">
                  {anyaHistory.map((val, idx) => (
                    <motion.div
                      key={`a-history-${idx}`}
                      initial={{ height: "20%" }}
                      animate={{ 
                        height: `${Math.max(20, (val / 10000) * 100)}%`,
                        backgroundColor: idx === anyaHistory.length - 1 && walletsPulsing 
                          ? "var(--color-primary)" 
                          : "var(--color-border)"
                      }}
                      className="w-full rounded-t-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Creator Card B (Rohan Verma's Wallet) */}
              <div className="w-[47%] bg-card/90 border border-border rounded-2xl p-4 shadow-lg flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-primary/50">
                {/* Floating payout overlay */}
                <AnimatePresence>
                  {walletsPulsing && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.8 }}
                      animate={{ opacity: 1, y: -22, scale: 1.1 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-foreground text-background border border-border text-[10px] font-bold font-mono px-2.5 py-1 rounded-full shadow-lg z-30"
                    >
                      +₹{((10000 * (100 - splitRatio)) / 100).toLocaleString()}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">
                        RV
                      </div>
                      <div className="hidden sm:block">
                        <h4 className="text-[11px] font-bold text-foreground leading-none">Rohan</h4>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">
                      {100 - splitRatio}%
                    </span>
                  </div>

                  <span className="text-[9px] text-muted-foreground block font-bold uppercase tracking-wider font-sans">Routed Earnings</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-sm sm:text-base font-bold text-foreground font-mono truncate">
                      ₹{rohanEarnings.toLocaleString()}
                    </span>
                    <FontAwesomeIcon icon={faArrowTrendUp} className="text-primary w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Micro Bar Chart */}
                <div className="flex items-end justify-between h-7 gap-1 mt-3 px-0.5 border-t border-border/50 pt-2">
                  {rohanHistory.map((val, idx) => (
                    <motion.div
                      key={`r-history-${idx}`}
                      initial={{ height: "20%" }}
                      animate={{ 
                        height: `${Math.max(20, (val / 10000) * 100)}%`,
                        backgroundColor: idx === rohanHistory.length - 1 && walletsPulsing 
                          ? "var(--color-primary)" 
                          : "var(--color-border)"
                      }}
                      className="w-full rounded-t-sm"
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Workflow steps Interconnected Layout */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-h3 text-foreground mb-2 font-display">From handshake to payout in 5 steps</h3>
            <p className="text-body text-muted-foreground max-w-xl mx-auto font-sans">
              Set it up once. Every future sale runs on the same contract — no spreadsheets, no chasing payments.
            </p>
          </div>
          
          <div className="relative font-sans">
            {/* Linear connection line running behind timeline on desktop */}
            <div className="absolute top-[32px] left-[8%] right-[8%] h-0.5 bg-border hidden md:block" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 relative z-10">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mb-4 text-foreground/85 shadow-sm group-hover:scale-105 group-hover:border-primary group-hover:text-primary transition-all duration-300 relative">
                    {/* Number label */}
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-muted border border-border text-[10px] font-bold text-foreground flex items-center justify-center">
                      {i + 1}
                    </span>
                    <FontAwesomeIcon icon={step.icon} className="w-5 h-5 transition-colors duration-300" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground mb-1 transition-colors duration-300 group-hover:text-primary font-display">{step.title}</h4>
                  <p className="text-xs text-muted-foreground leading-normal max-w-[170px] font-sans">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee intro */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-h3 text-foreground mb-2 font-display">Ways creators collaborate on Creonex</h3>
          <p className="text-body text-muted-foreground font-sans">
            Bundles, bootcamps, affiliates and more — every format supports automatic revenue splits.
          </p>
        </div>

      </div>

      {/* Infinite Scrolling Use Cases Marquee — full-bleed within section, edge fade mask */}
      <div className="relative z-10 mt-10 w-full overflow-x-hidden flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
        {/* Row 1: Scrolls Left */}
        <div className="flex w-full overflow-x-hidden">
          <div className="animate-marquee-left py-4 font-sans">
            {duplicatedRow1.map((item, idx) => (
              <div
                key={`r1-${idx}`}
                className="w-[320px] flex-shrink-0 bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:border-primary transition-all duration-300 ease-out group hover:-translate-y-1.5 whitespace-normal flex flex-col relative overflow-hidden"
              >
                {/* Ambient primary glow decoration */}
                <div className="absolute -right-8 -top-8 w-20 h-20 rounded-full filter blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-primary" />

                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 bg-muted border border-border text-foreground/85 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                </div>
                <h4 className="text-sm md:text-base font-bold text-foreground mb-1.5 transition-colors duration-300 group-hover:text-primary font-display">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Scrolls Right */}
        <div className="flex w-full overflow-x-hidden">
          <div className="animate-marquee-right py-4 font-sans">
            {duplicatedRow2.map((item, idx) => (
              <div
                key={`r2-${idx}`}
                className="w-[320px] flex-shrink-0 bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:border-primary transition-all duration-300 ease-out group hover:-translate-y-1.5 whitespace-normal flex flex-col relative overflow-hidden"
              >
                {/* Ambient primary glow decoration */}
                <div className="absolute -right-8 -top-8 w-20 h-20 rounded-full filter blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-primary" />

                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 bg-muted border border-border text-foreground/85 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                </div>
                <h4 className="text-sm md:text-base font-bold text-foreground mb-1.5 transition-colors duration-300 group-hover:text-primary font-display">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}