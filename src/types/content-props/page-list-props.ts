import { ContentType, ContentProps, SeoDataProps } from './_content-common';
import { LanguageProps } from '../language';

export type PageListData = Partial<{
    languages: LanguageProps[];
    ingress: string;
    sectionContents: ContentProps[];
    hide_date: boolean;
    hideSectionContentsDate: boolean;
    orderSectionContentsByPublished: boolean;
    feedbackToggle: boolean;
}> &
    SeoDataProps;

export interface PageListProps extends ContentProps {
    __typename: ContentType.PageList;
    data: PageListData;
}
