import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';

export const getUrlFromContent = (content: ContentProps) => {
    if (content.__typename === ContentType.InternalLink) {
        return content.data?.target?._path;
    }
    if (content.__typename === ContentType.ExternalLink) {
        return content.data?.url;
    }
    return content._path;
};
