import { ContentType, ContentProps } from './_content-common';
import { LanguageProps } from '../language';

export type PageListData = Partial<{
    languages: LanguageProps[];
    ingress: string;
    sectionContents: ContentProps[];
    metaDescription: string;
    hide_date: boolean;
    hideSectionContentsDate: boolean;
    orderSectionContentsByPublished: boolean;
}>;

export interface PageListProps extends ContentProps {
    __typename: ContentType.PageList;
    data: PageListData;
}
