export const getCurrentConsent = () => ({
    consent: { analytics: true, surveys: true },
    userActionTaken: true,
});

export const setParams = () => {};

export const logAnalyticsEvent = () => Promise.resolve();

// Mirrors the Events export from @navikt/nav-dekoratoren-moduler.
// Proxy returns the property name as string for any access, so any new event
// added upstream still resolves to a usable value in Storybook.
export const Events = new Proxy(
    {},
    {
        get: (_target, prop) => (typeof prop === 'string' ? prop : undefined),
    }
);
