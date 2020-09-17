import { EnonicRef } from '../../utils/enonic-ref';
import { ContentType, GlobalSchema } from './_schemas';

export interface InternalLinkSchema extends GlobalSchema {
    type: ContentType.InternalLink;
    data: {
        description?: string;
        target: EnonicRef;
    };
}
