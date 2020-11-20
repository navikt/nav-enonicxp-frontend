import { ContentType, GlobalContentSchema } from './_schema';
import { XpContentRef } from '../../utils/paths';

export type PageListData = Partial<{
    ingress: string;
    sectionContents: XpContentRef[];
    metaDescription: string;
}>;

export interface PageListProps extends GlobalContentSchema {
    __typename: ContentType.PageList;
    data: PageListData;
}
