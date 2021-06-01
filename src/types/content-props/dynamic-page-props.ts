import {
    ContentType,
    ContentProps,
    SeoDataProps,
    ContentDecoratorToggles,
} from './_content-common';
import { LanguageProps } from '../language';
import { ProductDataMixin } from '../component-props/_mixins';

export type ProductLabel = 'benefits' | 'rights';

export type DynamicPageData = Partial<{
    languages: LanguageProps[];
    description: string;
}> &
    SeoDataProps &
    ContentDecoratorToggles;

export type ProductData = ProductDataMixin & DynamicPageData;

export interface ProductPageProps extends ContentProps {
    __typename: ContentType.ProductPage;
    data: ProductData;
}

export interface SituationPageProps extends ContentProps {
    __typename: ContentType.SituationPage;
    data: ProductData;
}
