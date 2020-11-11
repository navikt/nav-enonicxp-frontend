import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';
import { xpPathToAppPath } from './paths';

export const getTargetIfRedirect = (contentData: ContentTypeSchema) => {
    switch (contentData?.__typename) {
        case ContentType.Site:
            return '/no/person';
        case ContentType.InternalLink:
            return xpPathToAppPath(contentData.data.target._path);
        case ContentType.ExternalLink:
            return contentData.data.url;
        default:
            return null;
    }
};
