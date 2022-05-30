import { ComponentProps, PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    ExpandableMixin,
    FiltersMixin,
    RenderOnAuthStateMixin,
} from '../_mixins';
import { ProductDetailType } from '../../content-props/product-details';

export interface ProductDetailsProps extends PartComponentProps {
    descriptor: PartType.ProductDetails;
    config: {
        detailType: ProductDetailType;
        // Note: the components field is defined as a special case on the backend
        // and is not included in the Graphql schema.
        components: ComponentProps[];
    } & ExpandableMixin &
        FiltersMixin &
        RenderOnAuthStateMixin;
}
