import { ContentType, GlobalContentSchema } from './_schema';

export type LegacyData = Partial<{
    html: string;
}>;

export interface LegacyProps extends GlobalContentSchema {
    __typename: ContentType.Legacy;
    data: LegacyData;
}
