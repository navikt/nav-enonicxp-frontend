import { ContentType, GlobalSchema } from './_schemas';
import { EnonicRef } from '../../utils/enonic-ref';

export interface ContentListSchema extends GlobalSchema {
    type: ContentType.ContentList;
    data: {
        sectionContents: EnonicRef[];
    };
}
