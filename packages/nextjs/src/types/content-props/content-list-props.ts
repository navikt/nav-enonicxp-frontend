import { DateTimeKey } from 'types/datetime';
import { ContentType, ContentCommonProps, ContentProps } from './_content-common';

export type ContentListData = {
    sectionContents?: ContentProps[];
    sortedBy?: DateTimeKey;
};

export type ContentListProps = ContentCommonProps & {
    type: ContentType.ContentList;
    data: ContentListData;
};
