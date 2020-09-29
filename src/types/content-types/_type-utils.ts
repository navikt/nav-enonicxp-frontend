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
    return typeof content?.description === 'string';
};
