import { ContentType } from '../types/content-props/_content-common';
import { ContentProps } from '../types/content-props/_content-common';
import { xpPathToPathname } from './paths';
import { getEnvUrl } from './url-lookup-table';

export const getTargetIfRedirect = (content: ContentProps) => {
    switch (content?.__typename) {
        case ContentType.Site:
            return '/no/person';
        case ContentType.InternalLink:
            return getEnvUrl(xpPathToPathname(content.data?.target?._path));
        case ContentType.ExternalLink:
        case ContentType.Url:
            return getEnvUrl(xpPathToPathname(content.data?.url));
        default:
            return null;
    }
};
