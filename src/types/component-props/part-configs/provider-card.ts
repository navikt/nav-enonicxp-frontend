import { LinkSelectable } from 'types/component-props/_mixins';
import { XpImageProps } from 'types/media';

export type PartConfigProviderCard = Partial<{
    link: LinkSelectable;
    icon: XpImageProps;
    description: string;
    endnote: string;
}>;
