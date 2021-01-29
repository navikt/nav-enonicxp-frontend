import { LayoutCommonProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';

export interface FlexColsLayoutProps extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.FlexCols;
    regions: {
        flexcols: {
            components: ComponentProps[];
            name: 'flexcols';
        };
    };
    config: {
        numCols: number;
        margin: string;
        bgColor: string;
        bgFullWidth: boolean;
    };
}
