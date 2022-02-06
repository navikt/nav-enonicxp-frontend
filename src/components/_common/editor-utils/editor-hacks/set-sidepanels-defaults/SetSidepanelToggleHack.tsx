import React, { useEffect } from 'react';
import { adminOrigin } from '../../../../../utils/urls';
import { fetchWithTimeout } from '../../../../../utils/fetch-utils';

const getCsContentApiUrl = (contentId: string) =>
    `${adminOrigin}/admin/rest-v2/cs/cms/default/content/content?id=${contentId}`;

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
    const url = getCsContentApiUrl(contentId);

    useEffect(() => {
        fetchWithTimeout(url, 5000)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(res.status);
            })
            .then((json) => {
                // If isPage === true, the page has been customized and the
                // component editor will be active
                if (json.isPage) {
                    minimizeLeftPanel();
                }
            })
            .catch((e) =>
                console.error(`Error fetching content from CS api - ${e}`)
            );
    }, []);

    return null;
};
