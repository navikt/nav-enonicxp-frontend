import amplitude from 'amplitude-js';

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
    logAmplitudeEvent('navigere', {
        komponent: component,
        lenkegruppe: linkGroup,
        destinasjon: href,
        lenketekst: linkText,
    });
};

export function logAmplitudeEvent(eventName: string, data?: any): Promise<any> {
    return new Promise(function (resolve: any) {
        const eventData = data || {};
        eventData.app = 'nav-enonicxp-frontend';
        eventData.origin = 'navno-frontend';
        eventData.originVersion = 'unknown';
        amplitude.getInstance().logEvent(eventName, eventData, resolve);
    });
}
