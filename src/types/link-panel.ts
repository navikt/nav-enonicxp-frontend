import { ContentProps } from './content-props/_content-common';

export type LinkPanel = {
    title: string;
    ingress?: string;
    spanning?: boolean;
    url: {
        text?: string;
        ref?: ContentProps;
    };
};
