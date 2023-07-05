import { ComponentProps, PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    ExpandableMixin,
    FiltersMixin,
    RenderOnAuthStateMixin,
} from '../_mixins';
import { ProductDetailType } from '../../content-props/product-details';
import { Language } from 'translations';
import { ContentProps } from 'types/content-props/_content-common';

export interface ProductDetailsProps extends PartComponentProps {
    descriptor: PartType.ProductDetails;
    pageProps: ContentProps;
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
