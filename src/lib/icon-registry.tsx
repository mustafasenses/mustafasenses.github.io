import { Icons } from "@/components/icons";
import { HomeIcon, type LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export { skillIcons } from "@/lib/skill-icons";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SvgIcon = ComponentType<any>;

export const socialIcons: Record<string, SvgIcon> = {
  github: Icons.github,
  linkedin: Icons.linkedin,
  email: Icons.email,
  globe: Icons.globe,
};

export const navIcons: Record<string, LucideIcon> = {
  home: HomeIcon,
};
