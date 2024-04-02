import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import {
    LinkSelectable,
    RenderOnAuthStateMixin,
} from 'types/component-props/_mixins';
import { XpImageProps } from 'types/media';

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
