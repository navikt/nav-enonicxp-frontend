import { ContentType, GlobalPageProps } from './_schema';
import { MainArticleChapterProps } from './main-article-chapter-props';
import { MenuListItem } from './menuListItems';

export interface MainArticleProps extends GlobalPageProps {
    __typename: ContentType.MainArticle;
    children: MainArticleChapterProps[];
    parent: undefined;
    data: {
        ingress?: string;
        metaDescription?: string;
        menuListItems?: MenuListItem;
    };
}
