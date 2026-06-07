import { Zap, Receipt, Banknote } from "lucide-react";

export default function IndiaFirstPayments() {
  return (
    <section className="bg-background py-12 md:py-16 relative z-10">
      <div className="page-container max-w-6xl">
        <div className="rounded-[2.5rem] border border-border/50 bg-card p-8 md:p-12 shadow-sm relative overflow-hidden">
           
           {/* Subtle Glow */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative z-10 items-center">
              
              {/* Left Side: Header */}
              <div className="lg:col-span-5 text-center lg:text-left">
                 <div className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary">India-First Payments</span>
                 </div>
                 <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                    Every way Indians pay.
                 </h3>
                 <p className="text-muted-foreground text-base leading-relaxed">
                    Zero friction checkout for your buyers. Predictable, secure weekly payouts for you.
                 </p>
              </div>

              {/* Right Side: Features */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                 
                 {/* Feature 1 */}
                 <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 bg-background/50 p-6 rounded-3xl border border-border/50 shadow-sm transition-colors hover:border-primary/30">
                    <div className="h-12 w-12 rounded-full bg-muted border border-border/50 flex items-center justify-center shrink-0 shadow-sm">
                       <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                       <p className="text-[15px] font-bold text-foreground mb-1.5">UPI Intent</p>
                       <p className="text-[13px] text-muted-foreground leading-relaxed">Native GPay & PhonePe directly.</p>
                    </div>
                 </div>

                 {/* Feature 2 */}
                 <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 bg-background/50 p-6 rounded-3xl border border-border/50 shadow-sm transition-colors hover:border-primary/30">
                    <div className="h-12 w-12 rounded-full bg-muted border border-border/50 flex items-center justify-center shrink-0 shadow-sm">
                       <Banknote className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                       <p className="text-[15px] font-bold text-foreground mb-1.5">Weekly Payouts</p>
                       <p className="text-[13px] text-muted-foreground leading-relaxed">Settled automatically every Monday.</p>
                    </div>
                 </div>

                 {/* Feature 3 */}
                 <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 bg-background/50 p-6 rounded-3xl border border-border/50 shadow-sm transition-colors hover:border-primary/30">
                    <div className="h-12 w-12 rounded-full bg-muted border border-border/50 flex items-center justify-center shrink-0 shadow-sm">
                       <Receipt className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                       <p className="text-[15px] font-bold text-foreground mb-1.5">Auto Invoices</p>
                       <p className="text-[13px] text-muted-foreground leading-relaxed">100% automated GST compliance.</p>
                    </div>
                 </div>

              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
