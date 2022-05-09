import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    ExpandableMixin,
    FiltersMixin,
    RenderOnAuthStateMixin,
} from '../_mixins';
import { ContentProps } from 'types/content-props/_content-common';

export interface ProductDetailsProps extends PartComponentProps {
    descriptor: PartType.ProductDetails;
    config: {
        productDetailsTarget: ContentProps;
    } & ExpandableMixin &
        FiltersMixin &
        RenderOnAuthStateMixin;
}
