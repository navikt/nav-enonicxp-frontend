export const hasDescription = (
    content: any
): content is {
    description: string;
} => {
    return typeof content?.description === 'string';
};

export const hasIngress = (
    content: any
): content is {
    ingress: string;
} => {
    return typeof content?.ingress === 'string';
};

export const hasMetaDescription = (
    content: any
): content is {
    metaDescription: string;
} => {
    return typeof content?.metaDescription === 'string';
};

export const hasCanonicalUrl = (
    content: any
): content is {
    canonicalUrl: string;
} => {
    return typeof content?.canonicalUrl === 'string';
};
