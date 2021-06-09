import {
    ContentDecoratorToggles,
    ContentProps,
    ContentType,
    SeoDataProps,
} from './_content-common';
import { LanguageProps } from '../language';
import { ProductDataMixin } from '../component-props/_mixins';

export type DynamicPageData = Partial<{
    languages: LanguageProps[];
    description: string;
}> &
    SeoDataProps &
    ContentDecoratorToggles;

export type ProductPageData = ProductDataMixin & DynamicPageData;

export interface ProductPageProps extends ContentProps {
    __typename: ContentType.ContentPageWithSidemenus;
    data: ProductPageData;
}

export type SituationPageData = ProductDataMixin & DynamicPageData;

export interface SituationPageProps extends ContentProps {
    __typename: ContentType.SituationPage;
    data: SituationPageData;
}
