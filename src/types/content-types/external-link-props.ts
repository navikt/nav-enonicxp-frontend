import { ContentType, GlobalContentSchema } from './_schema';

export interface ExternalLinkProps extends GlobalContentSchema {
    __typename: ContentType.ExternalLink;
    data: {
        description: string;
        url: string;
    };
}
