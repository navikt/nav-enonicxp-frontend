import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    SituationPageProps,
    ProductPageProps,
    ToolsPageProps,
} from '../../content-props/dynamic-page-props';

export type TargetPage = ProductPageProps | SituationPageProps | ToolsPageProps;

export interface ProductCardProps extends PartComponentProps {
    descriptor: PartType.ProductCard;
    config: {
        targetPage: TargetPage;
        ingressOverride?: string;
    };
}

export interface ProductCardMicroProps extends PartComponentProps {
    descriptor: PartType.ProductCardMicro;
    config: {
        card_list: {
            targetPage: TargetPage;
        }[];
    };
}
