import { ContentType } from '../types/content-props/_content-common';
import { ContentProps } from '../types/content-props/_content-common';
import { stripXpPathPrefix } from './urls';
import { getEnvUrl } from './url-lookup-table';

export const getTargetIfRedirect = (contentData: ContentProps) => {
    switch (contentData?.__typename) {
        case ContentType.SituationPage:
        case ContentType.ProductPage:
        case ContentType.ToolsPage:
            return !contentData.editMode
                ? getEnvUrl(
                      stripXpPathPrefix(contentData.data?.productRedirectUrl)
                  )
                : null;
        case ContentType.Site:
            return '/no/person';
        case ContentType.InternalLink:
            return getEnvUrl(
                stripXpPathPrefix(contentData.data?.target?._path)
            );
        case ContentType.ExternalLink:
        case ContentType.Url:
            return getEnvUrl(stripXpPathPrefix(contentData.data?.url));
        default:
            return null;
    }
};
