import { PartComponentProps } from '../_component-common';
import { LinkSelectable } from '../_mixins';
import { XpImageProps } from '../../media';

type ButtonPartSizePropLegacy = 'normal' | 'kompakt' | 'mini';
type ButtonPartSizeProp = 'medium' | 'small';
type ButtonPartTypeProp = 'standard' | 'hoved' | 'fare' | 'flat';

export type PartConfigButton = {
    link: LinkSelectable;
    type: ButtonPartTypeProp;
    size: ButtonPartSizePropLegacy | ButtonPartSizeProp;
    icon?: XpImageProps;
    fullwidth: boolean;
};
