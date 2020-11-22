import { ContentType, ContentTypeProps, GlobalContentProps } from './_common';

export interface ContentListProps extends GlobalContentProps {
    __typename: ContentType.ContentList;
    data: {
        sectionContents: ContentTypeProps[];
    };
}
