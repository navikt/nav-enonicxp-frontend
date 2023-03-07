import {
    ContentType,
    ContentCommonProps,
    ContentProps,
} from './_content-common';
import { DateTimeKey } from '../datetime';

export type ContentListData = Partial<{
    sectionContents: ContentProps[];
    sortedBy?: DateTimeKey;
}>;

export interface ContentListProps extends ContentCommonProps {
    type: ContentType.ContentList;
    data: ContentListData;
}
