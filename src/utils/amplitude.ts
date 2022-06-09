import amplitude from 'amplitude-js';

export enum analyticsEvents {
    NAVIGATION = 'navigere',
    COPY_LINK = 'kopier-lenke',
    CHAT_OPEN = 'chat-åpnet',
    CALL = 'ring-oss',
}
export enum analyticsContent {
    TABLE_OF_CONTENTS = 'innholdsmeny',
    CONTENT_SECTION = 'innholdsseksjon',
    PRODUCT_LIST = 'varehylle',
    OTHER_SUPPLIERS = 'andre som kan hjelpe',
    OTHER_CHANNELS = 'kontaktmodul'
}
export interface analyticsData {
    komponent?: string,
    lenkegruppe?: string,
    destinasjon?: string,
    lenketekst?: string,
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

export const logLinkClick = (
    href: string,
    linkText: string | undefined,
    component?: string,
    linkGroup?: string
) => {
    logAmplitudeEvent(analyticsEvents.NAVIGATION, {
        komponent: component,
        lenkegruppe: linkGroup,
        destinasjon: href,
        lenketekst: linkText,
    });
};

export function logAmplitudeEvent(eventName: analyticsEvents, data?: analyticsData): Promise<any> {
    interface amplitudeData extends analyticsData {
        app: string,
        origin: string,
        originVersion: string,
    }
    return new Promise(function (resolve: any) {
        const eventData: amplitudeData = {
            ...data,
            app: 'nav-enonicxp-frontend',
            origin: 'navno-frontend',
            originVersion: 'unknown',
        };
        amplitude.getInstance().logEvent(eventName, eventData, resolve);
    });
}
