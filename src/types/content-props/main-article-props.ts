import { MainArticleChapterProps } from './main-article-chapter-props';
import { ContentType, ContentProps, SeoDataProps } from './_content-common';
import { MenuListItem } from '../menu-list-items';
import { LanguageProps } from '../language';
import { XpImageProps } from '../media';

export type Picture = Partial<{
    target: XpImageProps;
    size: '100' | '70' | '40';
    caption: string;
    altText: string;
}>;

export type MainArticleData = Partial<{
    languages: LanguageProps[];
    ingress: string;
    text: string;
    hasTableOfContents: string;
    fact: string;
    social: string[];
    picture: Picture;
    menuListItems: MenuListItem;
    feedbackToggle: boolean;
    chapters: MainArticleChapterProps[];
}> &
    SeoDataProps;

export interface MainArticleProps extends ContentProps {
    __typename: ContentType.MainArticle;
    children?: MainArticleChapterProps[]; // TODO: remove after backend chapters-update
    data: MainArticleData;
}
