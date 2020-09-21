import { ContentType, GlobalSchema } from './_schema';

export interface NotImplementedProps extends GlobalSchema {
    __typename: ContentType.NotImplemented;
    data: {
        html?: string;
    };
}
