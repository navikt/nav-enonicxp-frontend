import { MainArticleChapterProps } from './main-article-chapter-props';
import { ContentType, GlobalContentProps } from './_content-common';
import { MenuListItem } from './menuListItems';

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

export interface MainArticleProps extends GlobalContentProps {
    __typename: ContentType.MainArticle;
    children?: MainArticleChapterProps[];
    data: MainArticleData;
}
