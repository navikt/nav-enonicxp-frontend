import amplitude from 'amplitude-js';

export enum analyticsEvents {
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
    eventName: analyticsEvents,
    data?: any
): Promise<any> {
    return new Promise(function (resolve: any) {
        const eventData = {
            ...data,
            app: 'nav-enonicxp-frontend',
            origin: 'navno-frontend',
            originVersion: 'unknown',
            platform: window.location.toString(),
        };
        amplitude.getInstance().logEvent(eventName, eventData, resolve);
    });
}
