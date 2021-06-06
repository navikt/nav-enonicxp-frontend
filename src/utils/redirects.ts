import { ContentType } from '../types/content-props/_content-common';
import { ContentProps } from '../types/content-props/_content-common';
import { sourcePathIsCustomPublicPath, stripXpPathPrefix } from './urls';
import { getEnvUrl } from './url-lookup-table';

export const getTargetIfRedirect = (
    content: ContentProps,
    sourcePath: string
) => {
    if (!content) {
        return null;
    }

    const { data, __typename, editMode } = content;

    if (
        !editMode &&
        data?.customPublicPath &&
        !sourcePathIsCustomPublicPath(content, sourcePath)
    ) {
        return data.customPublicPath;
    }

    switch (__typename) {
        case ContentType.Site:
            return '/no/person';
        case ContentType.InternalLink:
            return getEnvUrl(stripXpPathPrefix(data?.target?._path));
        case ContentType.ExternalLink:
        case ContentType.Url:
            return getEnvUrl(stripXpPathPrefix(data?.url));
        default:
            return null;
    }
};
