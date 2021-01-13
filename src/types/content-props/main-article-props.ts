import { MainArticleChapterProps } from './main-article-chapter-props';
import { ContentType, ContentProps } from './_content-common';
import { MenuListItem } from '../menu-list-items';
import { LanguageProps } from '../language';
import { XpImage } from '../media';

type VectorImage = {
    __typename: 'media_Vector';
    mediaUrl?: string;
};

type BitmapImage = {
    __typename: 'media_Image';
    imageUrl?: string;
};

export type Picture = Partial<{
    target: XpImage;
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
}>;

export interface MainArticleProps extends ContentProps {
    __typename: ContentType.MainArticle;
    children?: MainArticleChapterProps[];
    data: MainArticleData;
}
