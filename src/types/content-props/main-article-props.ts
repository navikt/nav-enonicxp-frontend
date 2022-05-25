import { MainArticleChapterNavigationData } from './main-article-chapter-props';
import {
    ContentType,
    ContentProps,
    SeoDataProps,
    ContentDecoratorToggles,
} from './_content-common';
import { MenuListItem } from '../menu-list-items';
import { LanguageProps } from '../language';
import { XpImageProps } from '../media';
import { ProcessedHtmlProps } from '../processed-html-props';

export type Picture = Partial<{
    target: XpImageProps;
    size: '100' | '70' | '40';
    caption: string;
    altText: string;
}>;

export type SocialMedia = 'facebook' | 'twitter' | 'linkedin';

export type MainArticleData = Partial<{
    languages: LanguageProps[];
    ingress: string;
    text: ProcessedHtmlProps;
    hasTableOfContents: string;
    fact: ProcessedHtmlProps;
    social: SocialMedia[];
    picture: Picture;
    menuListItems: MenuListItem;
    chapters: MainArticleChapterNavigationData[];
}> &
    SeoDataProps &
    ContentDecoratorToggles;

export interface MainArticleProps extends ContentProps {
    __typename: ContentType.MainArticle;
    data: MainArticleData;
}
