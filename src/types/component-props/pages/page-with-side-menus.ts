import { LayoutBaseProps, LayoutType } from 'types/component-props/layouts';
import { ComponentProps, ComponentType } from 'types/component-props/_component-common';

import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';

type Regions =
    | 'topLeftMenu'
    | 'leftMenu'
    | 'pageContent'
    | 'topPageContent'
    | 'rightMenu'
    | 'bottomRow';

export interface PageWithSideMenusProps extends LayoutBaseProps {
    type: ComponentType.Page;
    descriptor: LayoutType.PageWithSideMenus;
    regions: {
        [key in Regions]: {
            components: ComponentProps[];
            name: Regions;
        };
    };
    config: {
        title: string;
        leftMenuHeader: string;
        leftMenuToggle: boolean;
        leftMenuSticky: boolean;
        showInternalNav: boolean;
        anchorLinks: AnchorLink[];
        rightMenuToggle: boolean;
        rightMenuSticky: boolean;
    };
}
