import { ContentProps } from 'types/content-props/_content-common';
import { isEditorFeatureEnabled } from 'components/_editor-only/site-info/feature-toggles/editor-feature-toggles-utils';
import { EditorFeature } from 'components/_editor-only/site-info/feature-toggles/SiteInfoFeatureToggles';
import { AutoReloadDisableHack } from './auto-refresh-disable/AutoReloadDisableHack';
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
                    {isEditorFeatureEnabled(EditorFeature.EditorReloadBlocker) && (
                        <AutoReloadDisableHack content={content} />
                    )}
                    <CustomSelectorLinkTargetHack />
                    {isEditorFeatureEnabled(EditorFeature.HideLeftPanel) && (
                        <SetSidepanelToggleHack contentId={_id} />
                    )}
                </>
            )}
        </>
    );
};
