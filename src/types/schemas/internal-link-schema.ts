import { ContentType, GlobalSchema } from './_schemas';

export interface InternalLinkSchema extends GlobalSchema {
    type: ContentType.InternalLink;
    data: {
        description?: string;
        target: {
            _path: string;
        };
    };
}
