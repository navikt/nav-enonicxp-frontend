import { LayoutProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';

export interface LayoutFlexCols extends LayoutProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.DynamicFlexCols;
    config: {
        numCols: number;
        bgColor: string;
        bgFullWidth: boolean;
    };
    regions: {
        flexcols: {
            components: ComponentProps[];
            name: 'flexcols';
        };
    };
}
