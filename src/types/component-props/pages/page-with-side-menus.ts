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
        pageHeader: string;
        leftMenuHeader: string;
        leftMenuToggle: boolean;
        leftMenuSticky: boolean;
        showInternalNav: boolean;
        anchorLinks: AnchorLink[];
        rightMenuToggle: boolean;
        rightMenuSticky: boolean;
    };
}
