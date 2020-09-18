import { EnonicId } from '../utils/enonic-id';

export type LenkeData = {
    url: string;
    lenketekst: string;
    label?: string;
    enonicId?: EnonicId;
};
