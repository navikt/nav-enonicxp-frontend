import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ContentProps } from 'types/content-props/_content-common';

export interface ProductDetailsProps extends PartComponentProps {
    descriptor: PartType.ProductDetails;
    config: Partial<{
        header?: string;
        productDetailsTarget: ContentProps;
    }>;
}
