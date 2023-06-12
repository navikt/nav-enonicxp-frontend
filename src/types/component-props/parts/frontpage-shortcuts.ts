import { PartType } from '../parts';
import { PartComponentProps } from '../_component-common';
import { ContentListData } from '../../content-props/content-list-props';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';

export type FrontpageContentListData = {
    data: ContentListData;
};

type Shortcut = {
    target: {
        _path: string;
        displayName: string;
        data: {
            url?: string;
            illustration?: AnimatedIconsProps;
            title?: string;
        };
    };
    customTitle: string;
    customIllustration?: AnimatedIconsProps;
};

export interface FrontpageShortcutsProps extends PartComponentProps {
    descriptor: PartType.FrontpageShortcuts;
    config: {
        title: string;
        contentList: FrontpageContentListData;
        shortcuts: Shortcut[];
    };
}
