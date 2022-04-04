import { ContentProps } from '../../../types/content-props/_content-common';
import { AutoReloadDisableHack } from './auto-refresh-disable/AutoReloadDisableHack';
import {
    EditorFeatureCookie,
    isEditorFeatureEnabled,
} from '../site-info/feature-toggles/utils';
import { SetSidepanelToggleHack } from './set-sidepanels-defaults/SetSidepanelToggleHack';

// This implements quality-of-life fixes to improve the experiences for Content Studio users

type Props = {
    content: ContentProps;
};

export const EditorHacks = ({ content }: Props) => {
    if (content.editorView !== 'edit') {
        return null;
    }

    return (
        <>
            <AutoReloadDisableHack content={content} />
            {isEditorFeatureEnabled(EditorFeatureCookie.HideLeftPanel) && (
                <SetSidepanelToggleHack contentId={content._id} />
            )}
        </>
    );
};
