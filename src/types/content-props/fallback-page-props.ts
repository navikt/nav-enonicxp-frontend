import { ContentType, ContentCommonProps } from './_content-common';
import { EmptyObject } from 'types/util-types';

export type FallbackPageProps = ContentCommonProps & {
    type: ContentType.FallbackPage;
    data: EmptyObject;
};
