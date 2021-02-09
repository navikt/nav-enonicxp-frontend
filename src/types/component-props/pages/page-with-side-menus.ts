import { LayoutCommonProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';
import { AnchorLink } from '../parts/page-navigation-menu';

type Regions = 'leftMenu' | 'pageContent' | 'rightMenu';

export interface PageWithSideMenusProps extends LayoutCommonProps {
    type: ComponentType.Page;
    descriptor: LayoutType.PageWithSideMenus;
    regions: {
        [key in Regions]: {
            components: ComponentProps[];
            name: Regions;
        };
    };
    config: {
        leftMenuHeader: string;
        leftMenuToggle: boolean;
        leftMenuStickyToggle: boolean;
        anchorLinks: AnchorLink[];
        rightMenuToggle: boolean;
        rightMenuStickyToggle: boolean;
    };
}
