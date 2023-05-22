export function isFeatureFlagOn(featureFlag: string) {
    if (featureFlag == FeatureFlags.RAFFLE_SHUTDOWN_MAY_22) {
        return new Date(Date.now()) > new Date("2023/05/22");
    }
    else {
        return import.meta.env[featureFlag] === 'true';
    }
}

export const FeatureFlags = {
    RAFFLE_SHUTDOWN_MAY_22: 'VITE_REACT_APP_RAFFLE_SHUTDOWN_MAY_22',
}
