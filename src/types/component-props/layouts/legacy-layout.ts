import { LayoutCommonProps, LayoutType, Regions } from '../layouts';
import { ComponentType } from '../_component-common';

type LegacyRegions = 'first' | 'second';

export interface LegacyLayoutProps extends LayoutCommonProps {
    type: ComponentType.Layout | ComponentType.Page;
    descriptor:
        | LayoutType.LegacyMain
        | LayoutType.LegacyMain1Col
        | LayoutType.MainPage;
    regions: Regions<LegacyRegions>;
}
