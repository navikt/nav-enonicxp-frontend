import {
    SituationPageProps,
    ProductPageProps,
    ToolsPageProps,
} from 'types/content-props/dynamic-page-props';

export type TargetPage = ProductPageProps | SituationPageProps | ToolsPageProps;

type ProductTarget = {
    header?: string;
    targetPage: TargetPage;
    ingressOverride?: string;
};

export type PartConfigProductCard = ProductTarget;

export type PartConfigProductCardMini = ProductTarget;

export type PartConfigProductCardMicro = {
    header?: string;
    card_list: Array<{ targetPage?: TargetPage }>;
};
