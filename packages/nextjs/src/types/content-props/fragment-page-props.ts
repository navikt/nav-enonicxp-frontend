import { ComponentProps } from 'types/component-props/_component-common';
import { ContentType, ContentCommonProps } from './_content-common';

export type FragmentPageProps = ContentCommonProps & {
    type: ContentType.Fragment;
    fragment: ComponentProps;
};
