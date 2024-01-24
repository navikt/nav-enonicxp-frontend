import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export type AnchorLink = {
    anchorId: string;
    linkText: string;
    isDupe?: boolean;
    subLinks?: AnchorLink[];
};

export type PageNavViewStyle = 'sidebar' | 'inContent';

export interface PageNavigationMenuProps extends PartComponentProps {
    descriptor: PartType.PageNavigationMenu;
    config: {
        title: string;
        anchorLinks: AnchorLink[];
        viewStyle: PageNavViewStyle;
    };
}
