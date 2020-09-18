import { ContentType, GlobalSchema } from './_schemas';
import { EnonicContentRef } from '../../utils/enonic-path';

export interface PageListSchema extends GlobalSchema {
    type: ContentType.PageList;
    data: {
        ingress?: string;
        sectionContents?: EnonicContentRef[];
    };
}
