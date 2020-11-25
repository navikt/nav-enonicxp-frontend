import { ContentType, ContentProps } from './_content-common';

export type LegacyData = Partial<{
    html: string;
}>;

export interface LegacyProps extends ContentProps {
    __typename: ContentType.Legacy;
    data: LegacyData;
}
