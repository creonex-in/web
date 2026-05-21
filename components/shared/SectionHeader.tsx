interface SectionHeaderProps {
  badge?: string;
  heading: string;
  subtext?: string;
  align?: "center" | "left";
}

export default function SectionHeader({
  badge,
  heading,
  subtext,
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      {badge && <span className="section-badge">{badge}</span>}
      <h2>{heading}</h2>
      {subtext && <p className="body max-w-2xl">{subtext}</p>}
    </div>
  );
}
