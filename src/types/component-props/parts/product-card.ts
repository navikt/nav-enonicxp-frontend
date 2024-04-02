import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import {
    SituationPageProps,
    ProductPageProps,
    ToolsPageProps,
} from 'types/content-props/dynamic-page-props';

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
