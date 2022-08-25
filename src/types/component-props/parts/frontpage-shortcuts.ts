import { PartType } from '../parts';
import { PartComponentProps } from '../_component-common';
import { ContentListData } from '../../content-props/content-list-props';

export type FrontpageContentListData = {
    data: ContentListData;
};

export interface FrontpageShortcutsProps extends PartComponentProps {
    descriptor: PartType.FrontpageShortcuts;
    config: {
        title: string;
        contentList: FrontpageContentListData;
    };
}
