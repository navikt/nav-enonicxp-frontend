import amplitude from 'amplitude-js';
import { analyticsEvents } from '../types/analyticsTaxonomy';

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

export function logAmplitudeEvent(eventName: analyticsEvents, data?: any): Promise<any> {
    return new Promise(function (resolve: any) {
        const eventData = data || {};
        eventData.app = 'nav-enonicxp-frontend';
        eventData.origin = 'navno-frontend';
        eventData.originVersion = 'unknown';
        amplitude.getInstance().logEvent(eventName, eventData, resolve);
    });
}
