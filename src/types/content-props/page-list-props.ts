import {
    ContentType,
    ContentCommonProps,
    ContentProps,
} from './_content-common';
import { LanguageProps } from '../language';
import { MenuListItems } from '../menu-list-items';

export type PageListData = Partial<{
    languages: LanguageProps[];
    ingress: string;
    sectionContents: ContentProps[];
    hide_date: boolean;
    hideSectionContentsDate: boolean;
    orderSectionContentsByPublished: boolean;
    menuListItems: MenuListItems;
}>;

export interface PageListProps extends ContentCommonProps {
    type: ContentType.PageList;
    data: PageListData;
}
