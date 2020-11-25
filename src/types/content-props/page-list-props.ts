import { ContentType, ContentProps } from './_content-common';

export type PageListData = Partial<{
    ingress: string;
    sectionContents: ContentProps[];
    metaDescription: string;
}>;

export interface PageListProps extends ContentProps {
    __typename: ContentType.PageList;
    data: PageListData;
}
