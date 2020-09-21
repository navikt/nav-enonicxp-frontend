import { ContentType, GlobalSchema } from './_schema';
import { EnonicContentRef } from '../../utils/paths';

export interface InternalLinkProps extends GlobalSchema {
    __typename: ContentType.InternalLink;
    data: {
        description?: string;
        target: {
            _path: EnonicContentRef;
        };
    };
}
