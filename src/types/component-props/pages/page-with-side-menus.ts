import { LayoutCommonProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';

type Regions = 'leftMenu' | 'pageContent' | 'rightMenu';

export type AnchorLink = {
    anchorId: string;
    linkText: string;
};

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
