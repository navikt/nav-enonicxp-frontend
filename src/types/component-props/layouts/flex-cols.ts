import { LayoutCommonProps, LayoutType, Regions } from '../layouts';
import { ComponentType } from '../_component-common';
import { HeaderWithAnchorMixin, LayoutCommonConfigMixin } from '../_mixins';

export interface FlexColsLayoutProps extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.FlexCols;
    regions: Regions<'flexcols'>;
    config: {
        collapse: boolean;
        numCols: number;
        justifyContent: 'flex-start' | 'center' | 'flex-end';
    } & LayoutCommonConfigMixin &
        HeaderWithAnchorMixin;
}
