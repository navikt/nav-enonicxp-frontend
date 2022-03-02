import { LayoutCommonProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';
import { HeaderWithAnchorMixin } from '../_mixins';
import { FlexColsLayoutProps } from './flex-cols';

export interface ProductPageFlexColsLayoutProps extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.ProductPageFlexCols;
    regions: {
        flexcols: {
            components: ComponentProps[];
            name: 'flexcols';
        };
    };
    config: { usageContext: string } & HeaderWithAnchorMixin;
}
