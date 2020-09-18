import { EnonicId } from '../utils/enonic-id';

export type LinkPanel = {
    title: string;
    ingress?: string;
    spanning?: boolean;
    url: {
        text?: string;
        ref?: EnonicId;
    };
};
