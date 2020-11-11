import { ContentType, GlobalSchema } from './_schema';
import { XpContentRef } from '../../utils/paths';

export interface PageListProps extends GlobalSchema {
    __typename: ContentType.PageList;
    data: {
        ingress?: string;
        sectionContents?: XpContentRef[];
        metaDescription?: string;
    };
}
