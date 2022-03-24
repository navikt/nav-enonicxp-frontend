import { LayoutCommonProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';
import { LayoutCommonConfigMixin } from '../_mixins';

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
        numCols?: number;
        justifyContent: 'flex-start' | 'center' | 'flex-end';
    } & LayoutCommonConfigMixin;
}
