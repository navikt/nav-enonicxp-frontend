import { ContentType, GlobalPageSchema } from './_schema';
import { MainArticleChapterProps } from './main-article-chapter-props';
import { MenuListItem } from './menuListItems';

export interface MainArticleProps extends GlobalPageSchema {
    __typename: ContentType.MainArticle | ContentType.TemplatePage | ContentType.MainArticleChapter;
    children: MainArticleChapterProps[];
    parent: undefined;
    data: {
        displayName: string;
        article: {
            data: {
                text: string
            }
        };
        ingress: string;
        metaDescription: string;
        menuListItems: MenuListItem;
        text: string;
        hasTableOfContents: string;
    };
    publish?: {
        from: string;
    };
    language: string;
}


