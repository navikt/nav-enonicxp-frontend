import { ContentProps } from './content-props/_content-common';

export type Lenkepanel = {
    title: string;
    ingress?: string;
    url: {
        text?: string;
        ref?: ContentProps;
    };
};
