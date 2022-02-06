import { ContentProps } from '../../../../types/content-props/_content-common';
import { AutoRefreshDisableHack } from './auto-refresh-disable/AutoRefreshDisableHack';
import { SetSidepanelToggleHack } from './set-sidepanels-defaults/SetSidepanelToggleHack';

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
