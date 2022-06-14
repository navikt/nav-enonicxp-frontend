import { ContentType, ContentCommonProps } from './_content-common';

export type UrlData = {
    url: string;
};

export interface UrlProps extends ContentCommonProps {
    __typename: ContentType.Url;
    data: UrlData;
}
