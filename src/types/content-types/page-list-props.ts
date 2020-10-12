import { ContentType, GlobalSchema } from './_schema';
import { EnonicContentRef } from '../../utils/paths';

export interface PageListProps extends GlobalSchema {
    __typename: ContentType.PageList;
    data: {
        ingress?: string;
        sectionContents?: EnonicContentRef[];
        metaDescription?: string;
    };
}
