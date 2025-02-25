import { ContentType, ContentCommonProps } from './_content-common';

export type ExternalLinkData = {
    description?: string;
    url: string;
    permanentRedirect?: boolean;
};

export type ExternalLinkProps = ContentCommonProps & {
    type: ContentType.ExternalLink;
    data: ExternalLinkData;
};
