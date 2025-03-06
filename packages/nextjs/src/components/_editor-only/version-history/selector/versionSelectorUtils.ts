import { objectToQueryString } from '@/shared/fetch-utils';
import { ContentProps } from 'types/content-props/_content-common';
import { Branch } from 'types/branch';

export const getVersionSelectorUrl = (
    content: ContentProps,
    utcDateTime?: string,
    branch?: Branch
) => {
    const params = objectToQueryString({
        ...(utcDateTime && { time: utcDateTime }),
        id: content.liveId || content._id,
        locale: content.liveLocale || content.layerLocale,
        branch: branch === 'draft' ? branch : undefined,
    });

    return `${window.location.origin}${window.location.pathname}${params}`;
};
