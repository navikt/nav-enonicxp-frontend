import { LayoutCommonProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';

type DynamicColRegions = 'dynamic-1' | 'dynamic-2' | 'dynamic-3' | 'dynamic-4';

export interface FixedColsLayoutProps extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor:
        | LayoutType.Fixed1Col
        | LayoutType.Fixed2Col
        | LayoutType.Fixed3Col
        | LayoutType.Fixed4Col;
    regions: {
        [key in DynamicColRegions]: {
            components: ComponentProps[];
            name: DynamicColRegions;
        };
    };
    config: {
        distribution: string;
        marginTop: number;
        marginBottom: number;
        backgroundColor: string;
        bgFullWidth: boolean;
    };
}
