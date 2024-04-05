import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';

export type AnchorLink = {
    anchorId: string;
    linkText: string;
    isDupe?: boolean;
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
