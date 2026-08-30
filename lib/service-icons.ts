import {
  BarChart3,
  Bot,
  Braces,
  Boxes,
  CircuitBoard,
  Cloud,
  Code2,
  Cpu,
  Database,
  Figma,
  Gauge,
  Globe,
  Headphones,
  LineChart,
  Lock,
  Megaphone,
  MessagesSquare,
  Palette,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  Wand2,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * The icons a service may use.
 *
 * A curated map rather than a dynamic import of all of lucide: the admin needs
 * a finite list to show in a picker, and importing the whole set would put
 * roughly a thousand components into the bundle to render ten.
 */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  BarChart3,
  Bot,
  Boxes,
  Braces,
  CircuitBoard,
  Cloud,
  Code2,
  Cpu,
  Database,
  Figma,
  Gauge,
  Globe,
  Headphones,
  LineChart,
  Lock,
  Megaphone,
  MessagesSquare,
  Palette,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  Wand2,
  Workflow,
  Wrench,
};

export const SERVICE_ICON_NAMES = Object.keys(SERVICE_ICONS);

/** Falls back rather than throwing, so a renamed icon cannot break a page. */
export function iconFor(name: string): LucideIcon {
  return SERVICE_ICONS[name] ?? Code2;
}
