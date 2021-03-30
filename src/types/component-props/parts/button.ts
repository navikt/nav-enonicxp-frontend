import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { LinkSelectable } from '../_mixins';
import { XpImageProps } from '../../media';

export interface ButtonPartProps extends PartComponentProps {
    descriptor: PartType.Button;
    config: Partial<{
        link: LinkSelectable;
        type: 'standard' | 'fare' | 'hoved' | 'flat';
        size: 'normal' | 'kompakt' | 'mini';
        icon: XpImageProps;
        fullwidth: boolean;
    }>;
}
