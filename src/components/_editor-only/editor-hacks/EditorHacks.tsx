import { ContentProps } from '../../../types/content-props/_content-common';
import { AutoReloadDisableHack } from './auto-refresh-disable/AutoReloadDisableHack';
import {
    EditorFeatureCookie,
    isEditorFeatureEnabled,
} from '../site-info/feature-toggles/utils';
import { SetSidepanelToggleHack } from './set-sidepanels-defaults/SetSidepanelToggleHack';
import { CustomSelectorLinkTargetHack } from './custom-selector-link-target/CustomSelectorLinkTargetHack';

// This implements quality-of-life fixes to improve the experiences for Content Studio users

type Props = {
    content: ContentProps;
};

export const EditorHacks = ({ content }: Props) => {
    const { _id, editorView } = content;

    if (!editorView || editorView === 'preview') {
        return null;
    }

    return (
        <>
            {editorView === 'edit' && (
                <>
                    <AutoReloadDisableHack content={content} />
                    <CustomSelectorLinkTargetHack />
                    {isEditorFeatureEnabled(
                        EditorFeatureCookie.HideLeftPanel
                    ) && <SetSidepanelToggleHack contentId={_id} />}
                </>
            )}
        </>
    );
};
