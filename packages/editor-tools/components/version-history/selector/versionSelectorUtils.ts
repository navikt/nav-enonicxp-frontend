import { ContentProps } from '@/nextjs/types/content-props/_content-common';
import { Branch } from '@/nextjs/types/branch';
import { objectToQueryString } from '@/common/fetch-utils';

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
