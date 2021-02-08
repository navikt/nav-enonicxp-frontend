import { ContentType, ContentProps } from './_content-common';
import { ComponentProps } from '../component-props/_component-common';

export interface FragmentPageProps extends ContentProps {
    __typename: ContentType.Fragment;
    fragment: ComponentProps;
}
