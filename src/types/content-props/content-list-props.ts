import { ContentType, ContentProps } from './_content-common';
import { DateTimeContentField } from '../datetime';

export type ContentListData = Partial<{
    sectionContents: ContentProps[];
    dateLabelKey?: DateTimeContentField;
}>;

export interface ContentListProps extends ContentProps {
    __typename: ContentType.ContentList;
    data: ContentListData;
}
