import { LayoutBaseProps, LayoutType, Regions } from 'types/component-props/layouts';
import { ComponentType } from 'types/component-props/_component-common';
import { HeaderWithAnchorMixin } from 'types/component-props/_mixins';

export interface ProductPageFlexColsLayoutProps extends LayoutBaseProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.ProductPageFlexCols;
    regions: Regions<'flexcols'>;
    config: { usageContext: string } & HeaderWithAnchorMixin;
}
