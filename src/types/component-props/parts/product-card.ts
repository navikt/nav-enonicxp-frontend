import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    SituationPageProps,
    ProductPageProps,
    ToolsPageProps,
} from '../../content-props/dynamic-page-props';

export type TargetPage = ProductPageProps | SituationPageProps | ToolsPageProps;

export type ProductTarget = {
    title?: string;
    targetPage: TargetPage;
};

export interface ProductCardProps extends PartComponentProps {
    descriptor: PartType.ProductCard;
    config: {
        ingressOverride?: string;
    } & ProductTarget;
}

export interface ProductCardMiniProps extends PartComponentProps {
    descriptor: PartType.ProductCardMini;
    config: ProductTarget;
}

export interface ProductCardMicroProps extends PartComponentProps {
    descriptor: PartType.ProductCardMicro;
    config: {
        title?: string;
        card_list: ProductTarget[];
    };
}
