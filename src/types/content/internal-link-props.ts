import { ContentType, GlobalContentProps } from './_common';
import { XpContentRef } from '../../utils/paths';

export interface InternalLinkProps extends GlobalContentProps {
    __typename: ContentType.InternalLink;
    data: {
        description?: string;
        target: {
            _path: XpContentRef;
        };
    };
}
