import {
    ContentType,
    CustomContentCommonProps,
    CustomContentProps,
} from './_content-common';
import { LanguageProps } from '../language';
import { MenuListItems } from '../menu-list-items';

export type PageListData = Partial<{
    languages: LanguageProps[];
    ingress: string;
    sectionContents: CustomContentProps[];
    hide_date: boolean;
    hideSectionContentsDate: boolean;
    orderSectionContentsByPublished: boolean;
    menuListItems: MenuListItems;
}>;

export interface PageListProps extends CustomContentCommonProps {
    __typename: ContentType.PageList;
    data: PageListData;
}
