import { ContentType, GlobalPageSchema } from './_schema';
import { MainArticleChapterProps } from './main-article-chapter-props';
import { MenuListItem } from './menuListItems';

export interface MainArticleProps extends GlobalPageSchema {
    __typename: ContentType.MainArticle;
    children: MainArticleChapterProps[];
    parent: undefined;
    data: {
        ingress?: string;
        metaDescription?: string;
        menuListItems?: MenuListItem;
    };
}
