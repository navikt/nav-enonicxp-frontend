import {
    logAnalyticsEvent as logAnalyticsEventDecorator,
    Events,
    type EventName,
    type PropertiesFor,
} from '@navikt/nav-dekoratoren-moduler';

export { Events as AnalyticsEvents };
export type { EventName as AnalyticsEventName };

export function logAnalyticsEvent<TName extends EventName>(
    eventName: TName,
    eventData?: PropertiesFor<TName>
): Promise<any> {
    return logAnalyticsEventDecorator({
        eventName,
        eventData,
        origin: 'navno-frontend',
    });
}
