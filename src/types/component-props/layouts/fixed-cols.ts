import { LayoutCommonProps, LayoutType, Regions } from '../layouts';
import { ComponentType } from '../_component-common';
import { LayoutCommonConfigMixin } from '../_mixins';

type DynamicColRegions = 'dynamic-1' | 'dynamic-2' | 'dynamic-3' | 'dynamic-4';

export interface FixedColsLayoutProps extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor:
        | LayoutType.Fixed1Col
        | LayoutType.Fixed2Col
        | LayoutType.Fixed3Col
        | LayoutType.Fixed4Col;
    regions: Regions<DynamicColRegions>;
    config: {
        distribution: string;
    } & LayoutCommonConfigMixin;
}
