import { logAmplitudeEvent as logAmplitudeEventDecorator } from '@navikt/nav-dekoratoren-moduler';

export enum AnalyticsEvents {
    NAVIGATION = 'navigere',
    FILTER = 'filtervalg',
    ACC_EXPAND = 'accordion åpnet',
    ACC_COLLAPSE = 'accordion lukket',
    MODAL_OPEN = 'modal åpnet',
    MODAL_CLOSE = 'modal lukket',
    COPY_LINK = 'kopier-lenke',
    CHAT_OPEN = 'chat-åpnet',
    CALL = 'ring-oss',
}

export function logAmplitudeEvent(
    eventName: AnalyticsEvents,
    data?: any
): Promise<any> {
    return logAmplitudeEventDecorator({
        eventName,
        origin: 'nav-enonicxp-frontend',
        eventData: data,
    });
}
