import { LayoutBaseProps, LayoutType, Regions } from 'types/component-props/layouts';
import { ComponentType } from 'types/component-props/_component-common';
import { LayoutCommonConfigMixin } from 'types/component-props/_mixins';

type DynamicColRegions = 'dynamic-1' | 'dynamic-2' | 'dynamic-3';

export interface FixedColsLayoutProps extends LayoutBaseProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.Fixed1Col | LayoutType.Fixed2Col | LayoutType.Fixed3Col;
    regions: Regions<DynamicColRegions>;
    config: {
        distribution: string;
    } & LayoutCommonConfigMixin;
}
