import { ComponentProps, PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    ExpandableMixin,
    FiltersMixin,
    RenderOnAuthStateMixin,
} from '../_mixins';

export type ProductDetailType = 'rates' | 'payout_dates' | 'processing_times';

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
