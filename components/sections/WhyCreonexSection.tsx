import { FaShieldAlt, FaCalendarCheck, FaComments, FaLock } from "react-icons/fa";
import SectionHeader from "@/components/shared/SectionHeader";
import type { ComponentType } from "react";

interface Reason {
  Icon: ComponentType<{ className?: string }>;
  accent: "indigo" | "orange" | "green" | "purple";
  title: string;
  description: string;
}

const REASONS: Reason[] = [
  {
    Icon: FaShieldAlt,
    accent: "indigo",
    title: "Verified Indian experts",
    description:
      "Every creator goes through a manual review process. No random profiles — only professionals who deliver real results.",
  },
  {
    Icon: FaCalendarCheck,
    accent: "orange",
    title: "Book sessions instantly",
    description:
      "No waitlists, no email chains. See live availability and book a slot in under 60 seconds.",
  },
  {
    Icon: FaComments,
    accent: "green",
    title: "1-on-1 personalized guidance",
    description:
      "Unlike group classes, every session is tailored to your specific goals, portfolio, or project.",
  },
  {
    Icon: FaLock,
    accent: "purple",
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
            <div key={r.title} className="card-feature hover:shadow-lg flex flex-col gap-5">
              <span className={`icon-pad-${r.accent}`}>
                <r.Icon className="size-5" />
              </span>
              <div className="flex flex-col gap-2">
                <h3>{r.title}</h3>
                <p className="body">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
