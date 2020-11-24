import { ContentType, GlobalContentProps } from './_content-common';
import { MainArticleProps } from './main-article-props';
import { MenuListItem } from './menuListItems';

export interface MainArticleChapterProps extends GlobalContentProps {
    __typename: ContentType.MainArticleChapter;
    children: undefined;
    parent: MainArticleProps;
    data: {
        menuListItems?: MenuListItem;
    };
}
