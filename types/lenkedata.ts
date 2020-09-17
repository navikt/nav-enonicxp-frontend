import { EnonicRef } from '../utils/enonic-ref';

export type LenkeData = {
    url: string;
    lenketekst: string;
    label?: string;
    enonicId?: EnonicRef;
};
