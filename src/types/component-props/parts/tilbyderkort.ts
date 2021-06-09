import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { LinkSelectable } from '../_mixins';
import { XpImageProps } from '../../media';

export interface TilbyderkortPartProps extends PartComponentProps {
    descriptor: PartType.ProviderCard;
    config: Partial<{
        link: LinkSelectable;
        icon: XpImageProps;
        description: string;
        endnote: string;
    }>;
}
