import {
    ContentType,
    ContentTypeProps,
    GlobalContentProps,
} from './_content-common';

export type ContentListData = Partial<{
    sectionContents: ContentTypeProps[];
}>;

export interface ContentListProps extends GlobalContentProps {
    __typename: ContentType.ContentList;
    data: ContentListData;
}
