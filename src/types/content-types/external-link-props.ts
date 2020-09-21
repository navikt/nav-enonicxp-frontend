import { ContentType, GlobalSchema } from './_schema';

export interface ExternalLinkProps extends GlobalSchema {
    __typename: ContentType.ExternalLink;
    data: {
        description: string;
        url: string;
    };
}
