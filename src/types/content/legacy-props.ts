import { ContentType, GlobalContentProps } from './_common';

export type LegacyData = Partial<{
    html: string;
}>;

export interface LegacyProps extends GlobalContentProps {
    __typename: ContentType.Legacy;
    data: LegacyData;
}
