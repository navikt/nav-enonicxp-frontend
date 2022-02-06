import { ContentProps } from '../../../../types/content-props/_content-common';
import { AutoRefreshDisableHack } from './auto-refresh-disable/AutoRefreshDisableHack';
import { SetSidepanelToggleHack } from './set-sidepanels-defaults/SetSidepanelToggleHack';
import { adminOrigin } from '../../../../utils/urls';
import { fetchWithTimeout } from '../../../../utils/fetch-utils';

export type ContentWorkflowState = 'READY' | 'IN_PROGRESS';

// This response is much bigger, only specifying the fields we currently use
export type CsContentApiResponse = {
    isPage: boolean;
    workflow: { state: ContentWorkflowState };
};

export const fetchCsContentApi = async (
    contentId: string
): Promise<CsContentApiResponse | null> =>
    fetchWithTimeout(
        `${adminOrigin}/admin/rest-v2/cs/cms/default/content/content?id=${contentId}`,
        5000
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(`${res.status} - ${res.statusText}`);
        })
        .catch((e) => {
            console.error(`Error fetching from CS content api - ${e}`);
            return null;
        });

/*
 * This contains ugly "fixes" to improve the experiences for Content Studio
 * editor users :)
 *
 * */

export const EditorHacks = (content: ContentProps) => {
    const { editorView, _id } = content;

    if (editorView !== 'edit') {
        return null;
    }

    return (
        <>
            <AutoRefreshDisableHack contentId={_id} />
            <SetSidepanelToggleHack contentId={_id} />
        </>
    );
};
