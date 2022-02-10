import React, { useEffect } from 'react';
import { fetchAdminContent } from '../editor-fetch-utils';
import { getCookie } from '../../../../../utils/cookies';

/*
 * Closes the left-side data editor panel for content which has been customized
 * for use with the right-side components editor. The left panel is rarely used
 * for such content, so we close it by default as a convenience
 *
 * */

// TODO: create some UI to toggle this
const toggleCookieName = 'hide-left-panel';

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
        if (getCookie(toggleCookieName)) {
            fetchAdminContent(contentId).then((res) => {
                console.log(res?.page?.type);
                if (res?.page?.type === 'page') {
                    minimizeLeftPanel();
                }
            });
        }
    }, [contentId]);

    return null;
};
