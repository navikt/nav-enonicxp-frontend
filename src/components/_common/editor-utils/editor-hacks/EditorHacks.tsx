import { ContentProps } from '../../../../types/content-props/_content-common';
import { AutoRefreshDisableHack } from './auto-refresh-disable/AutoRefreshDisableHack';

/*
 * This contains various "quality of life" fixes to improve the experiences for
 * Content Studio editor users
 *
 * */

type Props = {
    content: ContentProps;
};

export const EditorHacks = ({ content }: Props) => {
    const { editorView } = content;

    if (editorView !== 'edit') {
        return null;
    }

    return (
        <>
            <AutoRefreshDisableHack content={content} />
            {/*<SetSidepanelToggleHack contentId={_id} />*/}
        </>
    );
};
