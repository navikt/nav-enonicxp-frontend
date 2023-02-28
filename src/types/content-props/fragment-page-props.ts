import { ContentType, ContentCommonProps } from './_content-common';
import { ComponentProps } from '../component-props/_component-common';

export interface FragmentPageProps extends ContentCommonProps {
    type: ContentType.Fragment;
    fragment: ComponentProps;
}
