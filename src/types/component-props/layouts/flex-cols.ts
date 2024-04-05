import { LayoutCommonProps, LayoutType, Regions } from 'types/component-props/layouts';
import { ComponentType } from 'types/component-props/_component-common';
import { HeaderWithAnchorMixin, LayoutCommonConfigMixin } from 'types/component-props/_mixins';

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
