import { ContentType, GlobalSchema } from './_schema';
import { MainArticleProps } from './main-article-props';
import { MenuListItem } from './menuListItems';

export interface MainArticleChapterProps extends GlobalSchema {
    __typename: ContentType.MainArticleChapter;
    children: undefined;
    parent: MainArticleProps;
    data: {
        article: {
            data: {
                menuListItems?: MenuListItem;
            }
            publish?: {
                from: string;
            };
            language?: string;
        }
    };
}
