import amplitude from 'amplitude-js';

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
    VIDEO_START = 'video start',
    VIDEO_STOP = 'video stopp'
}

export const initAmplitude = () => {
    amplitude.getInstance().init('default', '', {
        apiEndpoint: 'amplitude.nav.no/collect-auto',
        saveEvents: false,
        includeUtm: true,
        includeReferrer: true,
        platform: window.location.toString(),
    });
};

export function logAmplitudeEvent(
    eventName: AnalyticsEvents,
    data?: any
): Promise<any> {
    const platform = window.location.toString(); // Be sure to get url before navigation
    return new Promise(function (resolve: any) {
        const eventData = {
            ...data,
            app: 'nav-enonicxp-frontend',
            origin: 'navno-frontend',
            originVersion: 'unknown',
            platform,
        };
        amplitude.getInstance().logEvent(eventName, eventData, resolve);
    });
}
