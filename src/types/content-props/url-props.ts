import { ContentType, CustomContentCommonProps } from './_content-common';

export type UrlData = {
    url: string;
};

export interface UrlProps extends CustomContentCommonProps {
    __typename: ContentType.Url;
    data: UrlData;
}
