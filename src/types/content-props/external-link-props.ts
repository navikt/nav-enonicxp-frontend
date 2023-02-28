import { ContentType, ContentCommonProps } from './_content-common';

export type ExternalLinkData = {
    description?: string;
    url: string;
    permanentRedirect?: boolean;
};

export interface ExternalLinkProps extends ContentCommonProps {
    type: ContentType.ExternalLink;
    data: ExternalLinkData;
}
