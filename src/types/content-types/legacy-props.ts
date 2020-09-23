import { ContentType, GlobalSchema } from './_schema';

export interface LegacyProps extends GlobalSchema {
    __typename: ContentType.Legacy;
    data: {
        html: string;
    };
}
