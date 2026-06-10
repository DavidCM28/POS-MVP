import type { FeatureFlag } from "@/shared/config/features";

export type AppNavigationItem = {
  label: string;
  href: string;
  feature?: FeatureFlag;
};
