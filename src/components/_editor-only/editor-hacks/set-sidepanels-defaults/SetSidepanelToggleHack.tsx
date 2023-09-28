import React, { useEffect } from 'react';
import { editorFetchAdminContent } from 'components/_editor-only/utils/editor-fetch';

/*
 * Closes the left-side data editor panel for content which has been customized
 * for use with the right-side components editor. The left panel is rarely used
 * for such content, so we close it by default as a convenience
 *
 * */

const minimizeLeftPanel = () => {
    const minimizeLeftButton = parent.window.document.getElementsByClassName(
        'minimize-edit icon-arrow-left'
    )?.[0] as HTMLElement;
    if (minimizeLeftButton) {
        minimizeLeftButton.click?.();
    }
};

type Props = {
    contentId: string;
};

export const SetSidepanelToggleHack = ({ contentId }: Props) => {
    useEffect(() => {
        editorFetchAdminContent(contentId).then((res) => {
            if (res?.page?.type === 'page') {
                minimizeLeftPanel();
            }
        });
    }, [contentId]);

    return null;
};
