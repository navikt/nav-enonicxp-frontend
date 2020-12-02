import { ContentType, ContentProps } from './_content-common';
import { XpContentRef } from '../../utils/paths';

export type InternalLinkData = {
    description?: string;
    target: {
        _path: XpContentRef;
    };
};

export interface InternalLinkProps extends ContentProps {
    __typename: ContentType.InternalLink;
    data: InternalLinkData;
}
