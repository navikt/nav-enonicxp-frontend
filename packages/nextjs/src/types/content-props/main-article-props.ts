import { MenuListItems } from 'types/menu-list-items';
import { XpImageProps } from 'types/media';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { ContentType, ContentCommonProps } from './_content-common';
import { MainArticleChapterNavigationData } from './main-article-chapter-props';

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
