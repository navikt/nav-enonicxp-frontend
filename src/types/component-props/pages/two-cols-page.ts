import { LayoutCommonProps, LayoutType, Regions } from 'types/component-props/layouts';
import { ComponentType } from 'types/component-props/_component-common';

type RegionName = 'mainCol' | 'sideCol';

export interface TwoColsPageProps extends LayoutCommonProps {
    type: ComponentType.Page;
    descriptor: LayoutType.TwoColsPage;
    regions: Regions<RegionName>;
    config: {
        sideColToggle: boolean;
    };
}
