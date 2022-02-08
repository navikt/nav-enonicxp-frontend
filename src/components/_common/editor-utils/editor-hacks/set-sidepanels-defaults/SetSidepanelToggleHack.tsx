import React, { useEffect } from 'react';
import { fetchCsContentApi } from '../EditorHacks';

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

/*
 * Closes the left-side data editor panel for content which has been customized
 * for use with the right-side components editor. The left panel is rarely used
 * for such content, so we close it by default as a convenience
 *
 * */

export const SetSidepanelToggleHack = ({ contentId }: Props) => {
    useEffect(() => {
        fetchCsContentApi(contentId).then((res) => {
            if (res?.isPage) {
                minimizeLeftPanel();
            }
        });
    }, [contentId]);

    return null;
};
