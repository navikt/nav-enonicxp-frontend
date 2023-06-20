import { ContentProps } from 'types/content-props/_content-common';
import { Branch } from 'types/branch';
import { objectToQueryString } from 'utils/fetch/fetch-utils';

export const getVersionSelectorUrl = (
    content: ContentProps,
    utcDateTime?: string,
    branch?: Branch
) => {
    const params = objectToQueryString({
        ...(utcDateTime && { time: utcDateTime }),
        id: content._id,
        branch: branch === 'draft' ? branch : undefined,
        locale: content.layerLocale,
    });

    return `${window.location.origin}${window.location.pathname}${params}`;
};
