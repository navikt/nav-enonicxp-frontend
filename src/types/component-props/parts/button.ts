import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { LinkSelectable, RenderOnAuthStateMixin } from '../_mixins';
import { XpImageProps } from '../../media';

export type ButtonPartSizePropLegacy = 'normal' | 'kompakt' | 'mini';

export type ButtonPartSizeProp = 'medium' | 'small';

export type ButtonPartTypeProp = 'standard' | 'hoved' | 'fare' | 'flat';

export interface ButtonPartProps extends PartComponentProps {
    descriptor: PartType.Button;
    config: {
        link: LinkSelectable;
        type: ButtonPartTypeProp;
        size: ButtonPartSizePropLegacy | ButtonPartSizeProp;
        icon?: XpImageProps;
        fullwidth: boolean;
    } & RenderOnAuthStateMixin;
}
