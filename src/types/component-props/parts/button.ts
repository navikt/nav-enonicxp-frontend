import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { LinkSelectable } from '../_mixins';
import { XpImageProps } from '../../media';
import { KnappBaseProps } from 'nav-frontend-knapper';

export interface ButtonPartProps extends PartComponentProps {
    descriptor: PartType.Button;
    config: Partial<{
        link: LinkSelectable;
        type: KnappBaseProps['type'];
        size: 'normal' | 'kompakt' | 'mini';
        icon: XpImageProps;
        fullwidth: boolean;
    }>;
}
