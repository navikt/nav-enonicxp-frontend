import { LayoutBaseProps, LayoutType } from 'types/component-props/layouts';
import { ComponentProps, ComponentType } from 'types/component-props/_component-common';

import { AnchorLink } from 'components/parts/meny-for-internnavigasjon/MenyForInternnavigasjonPart';

type Regions = 'pageContent' | 'topPageContent' | 'bottomRow';

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
        leftMenuHeader: string;
        showInternalNav: boolean;
        anchorLinks: AnchorLink[];
        showProductName?: boolean;
    };
}
