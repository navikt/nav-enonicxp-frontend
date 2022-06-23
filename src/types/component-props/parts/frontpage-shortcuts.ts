import { ContentProps } from 'types/content-props/_content-common';
import { PartType } from '../parts';
import { PartComponentProps } from '../_component-common';

export interface FrontpageShortcutsProps extends PartComponentProps {
    descriptor: PartType.NewsList;
    config: {
        title: string;
        shortcutList: ContentProps[];
    };
}
