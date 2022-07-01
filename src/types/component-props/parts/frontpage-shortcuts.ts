import { PartType } from '../parts';
import { PartComponentProps } from '../_component-common';
import { ContentProps } from '../../content-props/_content-common';

export type FrontpageContentListData = {
    data: {
        sectionContents: Partial<ContentProps>[];
    };
};

export interface FrontpageShortcutsProps extends PartComponentProps {
    descriptor: PartType.FrontpageShortcuts;
    config: {
        title: string;
        contentList: FrontpageContentListData;
    };
}
