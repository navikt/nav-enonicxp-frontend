import { PartType } from '../parts';
import { PartComponentProps } from '../_component-common';
import { ContentListProps } from '../../content-props/content-list-props';

export interface FrontpageShortcutsProps extends PartComponentProps {
    descriptor: PartType.FrontpageShortcuts;
    config: {
        title: string;
        contentList: ContentListProps;
    };
}
