import { ContentType } from '../types/content-props/_content-common';
import { ContentProps } from '../types/content-props/_content-common';
import { xpPathToPathname } from './paths';

const appOrigin = process.env.APP_ORIGIN;

const getTargetIfRedirectDev = (contentData: ContentProps) => {
    const redirect = getTargetIfRedirectProd(contentData);
    if (!redirect) {
        return null;
    }

    return redirect.replace(/^https:\/\/.*.nav.no/, appOrigin);
};

const getTargetIfRedirectProd = (contentData: ContentProps) => {
    switch (contentData?.__typename) {
        case ContentType.Site:
            return '/no/person';
        case ContentType.InternalLink:
            return xpPathToPathname(contentData.data?.target?._path);
        case ContentType.ExternalLink:
        case ContentType.Url:
            return xpPathToPathname(contentData.data?.url);
        default:
            return null;
    }
};

export const getTargetIfRedirect =
    appOrigin === 'https://www.nav.no'
        ? getTargetIfRedirectProd
        : getTargetIfRedirectDev;
