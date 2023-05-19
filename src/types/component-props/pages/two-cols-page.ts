import { LayoutCommonProps, LayoutType, Regions } from '../layouts';
import { ComponentType } from '../_component-common';

type RegionName = 'mainCol' | 'sideCol';

export interface TwoColsPageProps extends LayoutCommonProps {
    type: ComponentType.Page;
    descriptor: LayoutType.TwoColsPage;
    regions: Regions<RegionName>;
    config: {
        sideColToggle: boolean;
    };
}
