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
    const contentPath = content._path.split(xpContentPathPrefix)[1];
    if (!contentPath) {
        return null;
    }

    const query = `${stripXpPathPrefix(content._path)}?time=${utcDateTime}&id=${
        content._id
    }${branch === 'draft' ? '&branch=draft' : ''}`;

    return content.editorView
        ? `${xpDraftPathPrefix}${query}`
        : `/version${contentPath}${query}`;
};
