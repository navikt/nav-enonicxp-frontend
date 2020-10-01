import { ContentType, GlobalPageSchema } from './_schema';

export interface LegacyProps extends GlobalPageSchema {
    __typename: ContentType.Legacy;
    data: {
        html: string;
    };
}
