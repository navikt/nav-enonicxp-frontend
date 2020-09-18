import { ContentType, GlobalSchema } from './_schemas';

export interface NotImplementedSchema extends GlobalSchema {
    type: ContentType.NotImplemented;
    data: {
        html?: string;
    };
}
