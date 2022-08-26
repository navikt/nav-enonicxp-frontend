import { ContentProps } from '../../../../types/content-props/_content-common';
import { Branch } from '../../../../types/branch';
import {
    stripXpPathPrefix,
    xpContentPathPrefix,
    xpDraftPathPrefix,
} from '../../../../utils/urls';

export const getVersionSelectorUrl = (
    content: ContentProps,
    utcDateTime: string,
    branch: Branch
) => {
    const contentPath = stripXpPathPrefix(content._path);
    if (!contentPath) {
        return null;
    }

    const query = `${contentPath}?time=${utcDateTime}&id=${content._id}${
        branch === 'draft' ? '&branch=draft' : ''
    }`;

    return content.editorView
        ? `${xpDraftPathPrefix}${query}`
        : `/version${contentPath}${query}`;
};
