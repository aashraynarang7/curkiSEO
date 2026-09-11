import { CalendarClock, ChartPie, Mic, ShieldCheck, UserPlus, type LucideIcon } from "lucide-react";
import type { AssociateIconName } from "@/data/associates";

const icons: Record<AssociateIconName, LucideIcon> = {
  "chart-pie": ChartPie,
  mic: Mic,
  "user-plus": UserPlus,
  "calendar-clock": CalendarClock,
  "shield-check": ShieldCheck,
};

export function AssociateIcon({ name, className }: { name: AssociateIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon aria-hidden className={className} />;
}
