import {
    ContentType,
    ContentProps,
    SeoDataProps,
    ContentDecoratorToggles,
} from './_content-common';
import { LanguageProps } from '../language';

export type DynamicPageData = Partial<{
    languages: LanguageProps[];
    description: string;
}> &
    SeoDataProps &
    ContentDecoratorToggles;

export interface DynamicPageProps extends ContentProps {
    __typename: ContentType.DynamicPage;
    data: DynamicPageData;
}
