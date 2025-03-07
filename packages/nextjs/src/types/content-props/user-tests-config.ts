import { ContentCommonProps, ContentType } from './_content-common';

export type UserTestVariantProps = {
    id: string;
    url: string;
    linkText: string;
    percentage: number;
    title?: string;
    ingress?: string;
};

export type UserTestsConfigData = {
    title: string;
    ingress: string;
    cookieId: string;
    startTime?: string;
    endTime?: string;
    variants: UserTestVariantProps[];
};

export type UserTestsConfigProps = {
    type: ContentType.UserTestsConfig;
    data: UserTestsConfigData;
} & ContentCommonProps;
