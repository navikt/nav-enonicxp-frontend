import { LayoutCommonProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';

type DynamicColRegions = 'dynamic-1' | 'dynamic-2' | 'dynamic-3' | 'dynamic-4';

export interface FixedColsLayoutProps extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor:
        | LayoutType.Dynamic2Col
        | LayoutType.Dynamic3Col
        | LayoutType.Dynamic4Col;
    regions: {
        [key in DynamicColRegions]: {
            components: ComponentProps[];
            name: DynamicColRegions;
        };
    };
    config: {
        distribution: string;
        margin: string;
    };
}
