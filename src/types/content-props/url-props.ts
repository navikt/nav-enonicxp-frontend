import { ContentType, ContentCommonProps } from './_content-common';

export type UrlData = {
    url: string;
};

export interface UrlProps extends ContentCommonProps {
    type: ContentType.Url;
    data: UrlData;
}
