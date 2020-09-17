import { ContentType, GlobalSchema } from './_schemas';
import { EnonicRef } from '../../utils/enonic-ref';

export interface PageListSchema extends GlobalSchema {
    type: ContentType.PageList;
    data: {
        ingress?: string;
        sectionContents?: EnonicRef[];
    };
}
