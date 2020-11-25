import { MainArticleChapterProps } from './main-article-chapter-props';
import { ContentType, ContentProps } from './_content-common';
import { MenuListItem } from '../menu-list-items';

export interface Picture {
    target: {
        imageUrl: string;
    };
    size: string;
    caption: string;
    altText: string;
}

export type MainArticleData = Partial<{
    ingress: string;
    text: string;
    hasTableOfContents: string;
    fact: string;
    social: string[];
    picture: Picture;
    menuListItems: MenuListItem;
}>;

export interface MainArticleProps extends ContentProps {
    __typename: ContentType.MainArticle;
    children?: MainArticleChapterProps[];
    data: MainArticleData;
}
