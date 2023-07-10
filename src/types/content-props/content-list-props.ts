import {
    ContentType,
    ContentCommonProps,
    ContentProps,
} from './_content-common';
import { DateTimeKey } from '../datetime';

export type ContentListData = {
    sectionContents?: ContentProps[];
    sortedBy?: DateTimeKey;
};

export type ContentListProps = ContentCommonProps & {
    type: ContentType.ContentList;
    data: ContentListData;
};
