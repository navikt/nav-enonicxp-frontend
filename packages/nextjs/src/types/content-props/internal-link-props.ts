import { ContentType, ContentCommonProps } from './_content-common';

export type InternalLinkData = {
    description?: string;
    target: {
        _path: string;
    };
    permanentRedirect?: boolean;
    anchorId?: string;
};

export type InternalLinkProps = ContentCommonProps & {
    type: ContentType.InternalLink;
    data: InternalLinkData;
};
