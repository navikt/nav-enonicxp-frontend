import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    SituationPageProps,
    ProductPageProps,
    ToolsPageProps,
} from '../../content-props/dynamic-page-props';

export type TargetPage = ProductPageProps | SituationPageProps | ToolsPageProps;

export type ProductTarget = {
    header?: string;
    targetPage: TargetPage;
    ingressOverride?: string;
};

export interface ProductCardProps extends PartComponentProps {
    descriptor: PartType.ProductCard;
    config: ProductTarget;
}

export interface ProductCardMiniProps extends PartComponentProps {
    descriptor: PartType.ProductCardMini;
    config: ProductTarget;
}

export interface ProductCardMicroProps extends PartComponentProps {
    descriptor: PartType.ProductCardMicro;
    config: {
        header?: string;
        card_list: { targetPage: TargetPage }[];
    };
}
