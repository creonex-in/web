import { STATS } from "@/constants/data";
import {
  FaUsers,
  FaUserTie,
  FaBookOpen,
  FaStar,
} from "react-icons/fa";
import type { IconType } from "react-icons";

const STAT_ICONS: IconType[] = [FaUsers, FaUserTie, FaBookOpen, FaStar];

export default function StatsSection() {
  return (
    <section className="section-sm section-surface">
      <div className="container-inner">

        {/* Heading with decorative lines */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-[2px] w-14 sm:w-20 bg-primary rounded-full shrink-0" />
          <p className="text-[17px] sm:text-[22px] font-bold text-foreground text-center whitespace-nowrap">
            Trusted by{" "}
            <span className="text-brand-gradient">Learners</span>
            {" "}&amp; Creators
          </p>
          <div className="h-[2px] w-14 sm:w-20 bg-primary rounded-full shrink-0" />
        </div>

        {/* Stat cards — extra top padding so icons don't clip outside the section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-7">
          {STATS.map((stat, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <div
                key={stat.label}
                className="relative border border-dashed border-border bg-background rounded-xl px-6 pt-12 pb-6"
              >
                {/* Icon circle — centered on top border, left-aligned */}
                <div className="absolute -top-[26px] left-0 flex items-center justify-center size-[52px] rounded-full bg-secondary">
                  <Icon className="size-[22px] text-primary" />
                </div>

                <span className="block text-[34px] sm:text-[40px] font-extrabold leading-none text-foreground">
                  {stat.value}
                </span>
                <span className="body-sm block mt-3">{stat.label}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
