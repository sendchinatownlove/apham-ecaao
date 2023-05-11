export function isFeatureFlagOn(featureFlag: string) {
    return import.meta.env[featureFlag] === 'true';
}

export const FeatureFlags = {
    RAFFLE_SHUTDOWN_MAY_22: 'VITE_REACT_APP_RAFFLE_SHUTDOWN_MAY_22',
}
