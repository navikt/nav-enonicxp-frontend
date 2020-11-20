import { ContentType, GlobalContentSchema } from './_schema';
import { MainArticleProps } from './main-article-props';
import { MenuListItem } from './menuListItems';

export interface MainArticleChapterProps extends GlobalContentSchema {
    __typename: ContentType.MainArticleChapter;
    children: undefined;
    parent: MainArticleProps;
    data: {
        menuListItems?: MenuListItem;
    };
}
