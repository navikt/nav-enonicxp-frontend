import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    ProductPageProps,
    SituationPageProps,
} from 'types/content-props/dynamic-page-props';

export interface MicroCardProps extends PartComponentProps {
    descriptor: PartType.ProductCardMicro;
    config: {
        targetPage: ProductPageProps | SituationPageProps;
    };
}
