import { ContentType, ContentCommonProps } from './_content-common';

export type UrlData = {
    url: string;
};

export type UrlProps = ContentCommonProps & {
    type: ContentType.Url;
    data: UrlData;
};
