import { PartType } from '../parts';
import { PartComponentProps } from '../_component-common';
import { ContentProps } from '../../content-props/_content-common';

export type FrontpageContentListData = {
    data: {
        sectionContents: Pick<
            ContentProps,
            '_id' | '_path' | 'displayName' | 'modifiedTime'
        >[];
    };
};

export interface FrontpageShortcutsProps extends PartComponentProps {
    descriptor: PartType.FrontpageShortcuts;
    config: {
        title: string;
        contentList: FrontpageContentListData;
    };
}
