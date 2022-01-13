import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { LinkSelectable, RenderOnAuthStateMixin } from '../_mixins';
import { XpImageProps } from '../../media';

export type ButtonPartSizePropLegacy = 'normal' | 'kompakt' | 'mini';

export type ButtonPartSizeProp = 'medium' | 'small';

export interface ButtonPartProps extends PartComponentProps {
    descriptor: PartType.Button;
    config: Partial<
        {
            link: LinkSelectable;
            type: 'standard' | 'hoved' | 'fare' | 'flat';
            size: ButtonPartSizePropLegacy | ButtonPartSizeProp;
            icon: XpImageProps;
            fullwidth: boolean;
        } & RenderOnAuthStateMixin
    >;
}
