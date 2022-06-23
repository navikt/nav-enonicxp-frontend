import { LayoutCommonProps, LayoutType, Regions } from '../layouts';
import { ComponentType } from '../_component-common';
import { HeaderWithAnchorMixin } from '../_mixins';

export interface ProductPageFlexColsLayoutProps extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.ProductPageFlexCols;
    regions: Regions<'flexcols'>;
    config: { usageContext: string } & HeaderWithAnchorMixin;
}
