import { MainArticleChapterNavigationData } from './main-article-chapter-props';
import { ContentType, ContentCommonProps } from './_content-common';
import { MenuListItems } from '../menu-list-items';
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
export type ArticleContentType = 'news' | 'pressRelease' | 'lastingContent';
export type ArticleSubContentType = 'statistics' | 'none';

export type MainArticleData = Partial<{
    ingress: string;
    text: ProcessedHtmlProps;
    hasTableOfContents: string;
    fact: ProcessedHtmlProps;
    social: SocialMedia[];
    contentType: ArticleContentType;
    subContentType: ArticleSubContentType;
    picture: Picture;
    menuListItems: MenuListItems;
    chapters: MainArticleChapterNavigationData[];
}>;

export type MainArticleProps = ContentCommonProps & {
    type: ContentType.MainArticle;
    data: MainArticleData;
};
