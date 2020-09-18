import { EnonicContentRef } from '../../utils/enonic-path';
import { ContentType, GlobalSchema } from './_schemas';

export interface InternalLinkSchema extends GlobalSchema {
    type: ContentType.InternalLink;
    data: {
        description?: string;
        target: EnonicContentRef;
    };
}
