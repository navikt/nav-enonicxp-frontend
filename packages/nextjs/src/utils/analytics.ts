import {
    logAnalyticsEvent as logAnalyticsEventDecorator,
    EventName,
    PropertiesFor,
    Events,
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
