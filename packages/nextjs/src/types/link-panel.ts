import { ContentProps } from './content-props/_content-common';

export type LinkPanel = {
    title: string;
    ingress?: string;
    url: {
        text?: string;
        ref?: ContentProps;
    };
};
