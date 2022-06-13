import {
    ContentType,
    CustomContentCommonProps,
    CustomContentProps,
} from './_content-common';
import { DateTimeKey } from '../datetime';

export type ContentListData = Partial<{
    sectionContents: CustomContentProps[];
    sortedBy?: DateTimeKey;
}>;

export interface ContentListProps extends CustomContentCommonProps {
    __typename: ContentType.ContentList;
    data: ContentListData;
}
