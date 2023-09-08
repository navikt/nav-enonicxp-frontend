import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { LinkSelectable, RenderOnAuthStateMixin } from '../_mixins';
import { XpImageProps } from '../../media';

type ButtonPartSizePropLegacy = 'normal' | 'kompakt' | 'mini';

type ButtonPartSizePropNew = 'medium' | 'small';

export type ButtonPartSizeProp =
    | ButtonPartSizePropLegacy
    | ButtonPartSizePropNew;

export type ButtonPartTypeProp = 'standard' | 'hoved' | 'fare' | 'flat';

export interface ButtonPartProps extends PartComponentProps {
    descriptor: PartType.Button;
    config: {
        link: LinkSelectable;
        type: ButtonPartTypeProp;
        size: ButtonPartSizeProp;
        icon?: XpImageProps;
        fullwidth: boolean;
    } & RenderOnAuthStateMixin;
}
