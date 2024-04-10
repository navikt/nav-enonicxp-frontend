import { ComponentProps, PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import {
    ExpandableMixin,
    FiltersMixin,
    RenderOnAuthStateMixin,
} from 'types/component-props/_mixins';
import { ProductDetailType } from 'types/content-props/product-details';
import { Language } from 'translations';

export interface ProductDetailsProps extends PartComponentProps {
    descriptor: PartType.ProductDetails;
    config: {
        detailType: ProductDetailType;
        // Note: these two fields are defined as a special case on the backend
        // and are not included in the Graphql schema
        components: ComponentProps[];
        language: Language;
    } & ExpandableMixin &
        FiltersMixin &
        RenderOnAuthStateMixin;
}
