import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { LinkSelectable, RenderOnAuthStateMixin } from '../_mixins';
import { XpImageProps } from '../../media';

type ButtonPartSizePropLegacy = 'normal' | 'kompakt' | 'mini';

type ButtonPartSizeProp = 'medium' | 'small';

type ButtonPartTypeProp = 'standard' | 'hoved' | 'fare' | 'flat';

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
