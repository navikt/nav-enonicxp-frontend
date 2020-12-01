import { XpContentRef } from '../utils/paths';

export type LinkPanel = {
    title: string;
    ingress?: string;
    spanning?: boolean;
    url: {
        text?: string;
        ref?: XpContentRef;
    };
};
