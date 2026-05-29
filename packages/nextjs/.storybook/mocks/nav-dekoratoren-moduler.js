export { Events } from '@navikt/nav-dekoratoren-moduler/csr/index.js';

export const getCurrentConsent = () => ({
    consent: { analytics: true, surveys: true },
    userActionTaken: true,
});

export const setParams = () => {};

export const logAnalyticsEvent = () => Promise.resolve();
