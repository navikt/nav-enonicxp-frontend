import { ContentType, GlobalContentProps } from './_content-common';

export interface ExternalLinkProps extends GlobalContentProps {
    __typename: ContentType.ExternalLink;
    data: {
        description: string;
        url: string;
    };
}
