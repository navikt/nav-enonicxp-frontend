import { ContentType, CustomContentCommonProps } from './_content-common';
import { ComponentProps } from '../component-props/_component-common';

export interface FragmentPageProps extends CustomContentCommonProps {
    __typename: ContentType.Fragment;
    fragment: ComponentProps;
}
