import { EnonicContentRef } from '../utils/enonic-path';

export type LinkPanel = {
    title: string;
    ingress?: string;
    spanning?: boolean;
    url: {
        text?: string;
        ref?: EnonicContentRef;
    };
};
