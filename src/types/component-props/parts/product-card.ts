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

export type ProductCardProps = PartComponentProps & {
    descriptor: PartType.ProductCard;
    config: ProductTarget;
};

export type ProductCardMiniProps = PartComponentProps & {
    descriptor: PartType.ProductCardMini;
    config: ProductTarget;
};

export type ProductCardMicroProps = PartComponentProps & {
    descriptor: PartType.ProductCardMicro;
    config: {
        header?: string;
        card_list: Array<{ targetPage?: TargetPage }>;
    };
};
