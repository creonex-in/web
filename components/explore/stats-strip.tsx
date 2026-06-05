export function StatsStrip(): React.ReactElement {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm text-muted-foreground">
      <span><span className="font-semibold text-foreground">2,400+</span> creators</span>
      <span className="hidden h-3.5 w-px bg-border sm:block" />
      <span><span className="font-semibold text-foreground">50K+</span> sessions delivered</span>
      <span className="hidden h-3.5 w-px bg-border sm:block" />
      <span>Sessions from <span className="font-semibold text-foreground">₹99</span></span>
      <span className="hidden h-3.5 w-px bg-border sm:block" />
      <span><span className="font-semibold text-foreground">20</span> niches covered</span>
    </div>
  )
}
