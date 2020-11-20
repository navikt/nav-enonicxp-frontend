import { ContentType, GlobalContentSchema } from './_schema';
import { XpContentRef } from '../../utils/paths';

export interface InternalLinkProps extends GlobalContentSchema {
    __typename: ContentType.InternalLink;
    data: {
        description?: string;
        target: {
            _path: XpContentRef;
        };
    };
}
