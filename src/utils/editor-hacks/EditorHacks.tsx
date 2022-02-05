import { ContentProps } from '../../types/content-props/_content-common';
import { ReorderComponentsHack } from './reorder-components/ReorderComponentsHack';
import { AutoRefreshDisableHack } from './auto-refresh-disable/AutoRefreshDisableHack';
import { SetSidepanelToggleHack } from './set-sidepanels-defaults/SetSidepanelToggleHack';

export const EditorHacks = (content: ContentProps) => {
    const { editorView, _id } = content;

    if (editorView !== 'edit') {
        return null;
    }

    return (
        <>
            <ReorderComponentsHack />
            <AutoRefreshDisableHack contentId={_id} />
            <SetSidepanelToggleHack contentId={_id} />
        </>
    );
};
