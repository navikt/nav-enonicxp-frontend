export { Events } from '@navikt/analytics-types';

export const getCurrentConsent = () => ({
    consent: { analytics: true, surveys: true },
    userActionTaken: true,
});

export const setParams = () => {};

export const logAnalyticsEvent = () => Promise.resolve();
