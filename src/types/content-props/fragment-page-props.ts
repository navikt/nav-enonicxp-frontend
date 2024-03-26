import { ContentType, ContentCommonProps } from './_content-common';
import { ComponentProps } from 'types/component-props/_component-common';

export type FragmentPageProps = ContentCommonProps & {
    type: ContentType.Fragment;
    fragment: ComponentProps;
};
