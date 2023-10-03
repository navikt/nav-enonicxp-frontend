import { ContentCommonProps, ContentType } from './_content-common';

export type PageMetaProps = ContentCommonProps & {
    type: ContentType.PageMeta;
    data: any;
};
