import { EnonicId } from '../../utils/enonic-id';
import { ContentType, GlobalSchema } from './_schemas';

export interface InternalLinkSchema extends GlobalSchema {
    type: ContentType.InternalLink;
    data: {
        description?: string;
        target: EnonicId;
    };
}
