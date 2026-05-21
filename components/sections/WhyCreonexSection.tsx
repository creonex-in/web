import SectionHeader from "@/components/shared/SectionHeader";

const REASONS = [
  {
    icon: "🎯",
    accent: "indigo" as const,
    title: "Verified Indian experts",
    description:
      "Every creator goes through a manual review process. No random profiles — only professionals who deliver real results.",
  },
  {
    icon: "📅",
    accent: "orange" as const,
    title: "Book sessions instantly",
    description:
      "No waitlists, no email chains. See live availability and book a slot in under 60 seconds.",
  },
  {
    icon: "💬",
    accent: "green" as const,
    title: "1-on-1 personalized guidance",
    description:
      "Unlike group classes, every session is tailored to your specific goals, portfolio, or project.",
  },
  {
    icon: "🔒",
    accent: "purple" as const,
    title: "Secure payments & refunds",
    description:
      "UPI, cards, and wallets accepted. If a session doesn't meet your expectations, we'll refund — no questions asked.",
  },
];

export default function WhyCreonexSection() {
  return (
    <section className="section">
      <div className="container-inner flex flex-col gap-12">
        <SectionHeader
          badge="Why Creonex"
          heading="Built for serious learners"
          subtext="Other platforms sell you courses. We connect you with people who've been where you want to go."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {REASONS.map((r) => (
            <div key={r.title} className="card-feature hover:shadow-lg flex flex-col gap-4">
              <span className={`icon-pad-${r.accent} text-2xl w-fit`}>{r.icon}</span>
              <div className="flex flex-col gap-2">
                <h3 className="heading-card">{r.title}</h3>
                <p className="body text-muted-foreground">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
