import {
    logAnalyticsEvent as logAnalyticsEventDecorator,
    Events,
    type EventName,
    type PropertiesFor,
} from '@navikt/nav-dekoratoren-moduler';

export { Events as AnalyticsEvents };
export type { EventName as AnalyticsEventName };

export const ANALYTICS_ORIGIN = 'navno-frontend';

export function logAnalyticsEvent<TName extends EventName>(
    eventName: TName,
    eventData?: PropertiesFor<TName>
): Promise<any> {
    return logAnalyticsEventDecorator({
        eventName,
        eventData,
        origin: ANALYTICS_ORIGIN,
    });
}
