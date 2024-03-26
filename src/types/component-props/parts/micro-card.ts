import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
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
