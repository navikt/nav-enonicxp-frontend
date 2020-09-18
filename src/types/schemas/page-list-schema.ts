import { ContentType, GlobalSchema } from './_schemas';
import { EnonicId } from '../../utils/enonic-id';

export interface PageListSchema extends GlobalSchema {
    type: ContentType.PageList;
    data: {
        ingress?: string;
        sectionContents?: EnonicId[];
    };
}
