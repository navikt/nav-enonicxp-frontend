import { ContentType, ContentCommonProps } from './_content-common';

export type FallbackPageProps = ContentCommonProps & {
    type: ContentType.FallbackPage;
    data: {};
};
