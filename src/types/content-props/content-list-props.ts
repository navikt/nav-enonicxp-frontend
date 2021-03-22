import { ContentType, ContentProps } from './_content-common';
import { DateTimeKey } from '../datetime';

export type ContentListData = Partial<{
    sectionContents: ContentProps[];
    sortedBy?: DateTimeKey;
}>;

export interface ContentListProps extends ContentProps {
    __typename: ContentType.ContentList;
    data: ContentListData;
}
