import { ContentType } from '../types/content-props/_content-common';
import { ContentProps } from '../types/content-props/_content-common';
import { xpPathToPathname } from './paths';
import { getEnvUrl } from './url-lookup-table';
import { MediaProps, MediaType } from '../types/media';

export const getTargetIfRedirect = (contentData: ContentProps | MediaProps) => {
    switch (contentData?.__typename) {
        case ContentType.Site:
            return '/no/person';
        case ContentType.InternalLink:
            return getEnvUrl(xpPathToPathname(contentData.data?.target?._path));
        case ContentType.ExternalLink:
        case ContentType.Url:
            return getEnvUrl(xpPathToPathname(contentData.data?.url));
        case MediaType.Archive:
        case MediaType.Audio:
        case MediaType.Code:
        case MediaType.Data:
        case MediaType.Document:
        case MediaType.Executable:
        case MediaType.Image:
        case MediaType.Presentation:
        case MediaType.Spreadsheet:
        case MediaType.Text:
        case MediaType.Unknown:
        case MediaType.Vector:
        case MediaType.Video:
            return contentData.mediaUrl;
        default:
            return null;
    }
};
