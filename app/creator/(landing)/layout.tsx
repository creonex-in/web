import MarketingShell from "@/components/layout/marketing-shell";

export default function CreatorLandingLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <MarketingShell>{children}</MarketingShell>;
}
