import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    SituationPageProps,
    ProductPageProps,
} from '../../content-props/dynamic-page-props';

export interface ProductCardProps extends PartComponentProps {
    descriptor: PartType.ProductCard;
    config: {
        targetPage: ProductPageProps | SituationPageProps;
        ingressOverride?: string;
    };
}
