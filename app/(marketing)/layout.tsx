import MarketingShell from "@/components/layout/marketing-shell";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <MarketingShell>{children}</MarketingShell>;
}
