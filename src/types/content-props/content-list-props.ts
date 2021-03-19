import { ContentType, ContentProps } from './_content-common';
import { DateTimeContentKey } from '../datetime';

export type ContentListData = Partial<{
    sectionContents: ContentProps[];
    dateLabelKey?: DateTimeContentKey;
}>;

export interface ContentListProps extends ContentProps {
    __typename: ContentType.ContentList;
    data: ContentListData;
}
