import { ContentType, ContentProps } from './_content-common';

export type UrlData = {
    url: string;
};

export interface UrlProps extends ContentProps {
    __typename: ContentType.Url;
    data: UrlData;
}
