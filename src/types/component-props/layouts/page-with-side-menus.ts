import { LayoutCommonProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';

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
        leftMenuToggle: boolean;
        leftMenuStickyToggle: boolean;
        leftMenuWidth: number;
        rightMenuToggle: boolean;
        rightMenuStickyToggle: boolean;
        rightMenuWidth: number;
    };
}
