import { ComponentProps } from 'types/component-props/_component-common';
import { ExpandableMixin, FiltersMixin } from 'types/component-props/_mixins';
import { ProductDetailType } from 'types/content-props/product-details';
import { Language } from 'translations';

export type PartConfigProductDetails = {
    detailType: ProductDetailType;
    // Note: these two fields are defined as a special case on the backend
    // and are not included in the Graphql schema
    components: ComponentProps[];
    language: Language;
} & ExpandableMixin &
    FiltersMixin;
