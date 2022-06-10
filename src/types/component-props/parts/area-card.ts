import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { LinkSelectable } from '../_mixins';

export interface AreaCardPartProps extends PartComponentProps {
    descriptor: PartType.AreaCard;
    config: {
        link: LinkSelectable;
    };
}
