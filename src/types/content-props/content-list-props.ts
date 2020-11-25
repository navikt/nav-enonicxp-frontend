import { ContentType, ContentProps } from './_content-common';

export type ContentListData = Partial<{
    sectionContents: ContentProps[];
}>;

export interface ContentListProps extends ContentProps {
    __typename: ContentType.ContentList;
    data: ContentListData;
}
