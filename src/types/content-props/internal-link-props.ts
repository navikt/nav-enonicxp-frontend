import { ContentType, ContentProps } from './_content-common';
import { XpContentRef } from '../../utils/urls';

export type InternalLinkData = {
    description?: string;
    target: {
        _path: XpContentRef;
    };
    tempRedirect?: boolean;
};

export interface InternalLinkProps extends ContentProps {
    __typename: ContentType.InternalLink;
    data: InternalLinkData;
}
