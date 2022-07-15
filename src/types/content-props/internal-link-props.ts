import { ContentType, ContentCommonProps } from './_content-common';

export type InternalLinkData = {
    description?: string;
    target: {
        _path: string;
    };
    permanentRedirect?: boolean;
    anchorId?: string;
};

export interface InternalLinkProps extends ContentCommonProps {
    __typename: ContentType.InternalLink;
    data: InternalLinkData;
}
