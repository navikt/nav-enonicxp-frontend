import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { LinkSelectable } from 'types/component-props/_mixins';
import { XpImageProps } from 'types/media';

export interface TilbyderkortPartProps extends PartComponentProps {
    descriptor: PartType.ProviderCard;
    config: Partial<{
        link: LinkSelectable;
        icon: XpImageProps;
        description: string;
        endnote: string;
    }>;
}
