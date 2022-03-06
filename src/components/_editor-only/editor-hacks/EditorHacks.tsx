import { ContentProps } from '../../../types/content-props/_content-common';
import { AutoReloadDisableHack } from './auto-refresh-disable/AutoReloadDisableHack';
import { SetSidepanelToggleHack } from './set-sidepanels-defaults/SetSidepanelToggleHack';

/*
 * This contains quality of life fixes to improve the experiences for
 * Content Studio editor users
 *
 * */

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
            <SetSidepanelToggleHack contentId={content._id} />
        </>
    );
};
