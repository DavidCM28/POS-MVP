export const featureFlags = {
  mesas: true,
  delivery: false,
  ecommerce: false,
  facturacionElectronica: false,
  multiAlmacen: false,
} as const;

export type FeatureFlag = keyof typeof featureFlags;

export function isFeatureEnabled(feature: FeatureFlag) {
  return featureFlags[feature];
}
