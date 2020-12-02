import { ContentType, ContentProps } from './_content-common';

export type ExternalLinkData = {
    description: string;
    url: string;
};

export interface ExternalLinkProps extends ContentProps {
    __typename: ContentType.ExternalLink;
    data: ExternalLinkData;
}
