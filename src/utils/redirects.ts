import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { xpPathToAppPath } from './paths';

export const getTargetIfRedirect = (contentData: ContentProps) => {
    switch (contentData?.__typename) {
        case ContentType.Site:
            return '/no/person';
        case ContentType.InternalLink:
            return xpPathToAppPath(contentData.data.target._path);
        case ContentType.ExternalLink:
        case ContentType.Url:
            return contentData.data?.url;
        default:
            return null;
    }
};
