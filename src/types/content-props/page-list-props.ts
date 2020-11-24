import { ContentType, GlobalContentProps } from './_content-common';
import { XpContentRef } from '../../utils/paths';

export type PageListData = Partial<{
    ingress: string;
    sectionContents: XpContentRef[];
    metaDescription: string;
}>;

export interface PageListProps extends GlobalContentProps {
    __typename: ContentType.PageList;
    data: PageListData;
}
