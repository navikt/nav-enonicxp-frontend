import { ContentProps } from './content-props/_content-common';

export const hasDescription = (
    content: any
): content is {
    data: {
        description: string;
    };
} => {
    return typeof content?.data?.description === 'string';
};

export const hasIngress = (
    content: any
): content is {
    data: {
        ingress: string;
    };
} => {
    return typeof content?.data?.ingress === 'string';
};

export const hasMetaDescription = (
    content: any
): content is {
    data: {
        metaDescription: string;
    };
} => {
    return typeof content?.data?.metaDescription === 'string';
};

export const hasCanonicalUrl = (
    content: any
): content is {
    data: {
        canonicalUrl: string;
    };
} => {
    return typeof content?.data?.canonicalUrl === 'string';
};

export const isPropsWithContent = (props: any): props is { content: ContentProps } => {
    return !!props?.content;
};

export const createTypeGuard = <Type>(allowedValues: ReadonlyArray<Type>) => {
    const allowedValuesSet: ReadonlySet<Type> = new Set(allowedValues);

    const isAllowedValue = (value: unknown): value is Type => allowedValuesSet.has(value as Type);

    return isAllowedValue;
};
