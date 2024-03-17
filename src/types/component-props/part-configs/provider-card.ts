import { LinkSelectable } from '../_mixins';
import { XpImageProps } from '../../media';

export type PartConfigProviderCard = Partial<{
    link: LinkSelectable;
    icon: XpImageProps;
    description: string;
    endnote: string;
}>;
