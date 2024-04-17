import { EmptyObject } from 'types/util-types';
import { ContentType, ContentCommonProps } from './_content-common';

export type FallbackPageProps = ContentCommonProps & {
    type: ContentType.FallbackPage;
    data: EmptyObject;
};
