import { ContentType, GlobalSchema } from './_schemas';

export interface ExternalLinkSchema extends GlobalSchema {
    type: ContentType.ExternalLink;
    data: {
        description: string;
        url: string;
    };
}
