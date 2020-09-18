import { ContentType, GlobalSchema } from './_schemas';
import { EnonicId } from '../../utils/enonic-id';

export interface ContentListSchema extends GlobalSchema {
    type: ContentType.ContentList;
    data: {
        sectionContents: EnonicId[];
    };
}
