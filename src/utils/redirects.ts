import { ContentType } from '../types/content-props/_content-common';
import { ContentProps } from '../types/content-props/_content-common';
import { xpPathToPathname } from './paths';
import { getEnvUrl } from './url-lookup-table';

export const getTargetIfRedirect = (contentData: ContentProps) => {
    switch (contentData?.__typename) {
        case ContentType.Site:
            return '/no/person';
        case ContentType.InternalLink:
            return getEnvUrl(xpPathToPathname(contentData.data?.target?._path));
        case ContentType.ExternalLink:
        case ContentType.Url:
            return getEnvUrl(xpPathToPathname(contentData.data?.url));
        default:
            return null;
    }
};
