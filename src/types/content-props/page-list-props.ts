import {
    ContentType,
    ContentCommonProps,
    ContentProps,
} from './_content-common';
import { MenuListItems } from 'types/menu-list-items';

export type PageListData = Partial<{
    ingress: string;
    sectionContents: ContentProps[];
    hide_date: boolean;
    hideSectionContentsDate: boolean;
    orderSectionContentsByPublished: boolean;
    menuListItems: MenuListItems;
}>;

export type PageListProps = ContentCommonProps & {
    type: ContentType.PageList;
    data: PageListData;
};
