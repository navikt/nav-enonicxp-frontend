import { EnonicRef } from '../utils/enonic-ref';

export type LinkPanel = {
    title: string;
    ingress?: string;
    spanning?: boolean;
    url: {
        text?: string;
        ref?: EnonicRef;
    };
};
