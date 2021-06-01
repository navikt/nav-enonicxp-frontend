import {
    ContentType,
    ContentProps,
    SeoDataProps,
    ContentDecoratorToggles,
} from './_content-common';
import { LanguageProps } from '../language';
import { AnimatedIconsProps } from './animated-icons';

export type ProductLabel = 'benefits' | 'rights';

export type DynamicPageData = Partial<{
    languages: LanguageProps[];
    description: string;
}> &
    SeoDataProps &
    ContentDecoratorToggles;

export type ProductData = {
    title: string;
    ingress?: string;
    label?: ProductLabel;
    illustration: AnimatedIconsProps;
} & DynamicPageData;

export interface ProductPageProps extends ContentProps {
    __typename: ContentType.ProductPage;
    data: ProductData;
}

export interface OverviewPageProps extends ContentProps {
    __typename: ContentType.OverviewPage;
    data: ProductData;
}
