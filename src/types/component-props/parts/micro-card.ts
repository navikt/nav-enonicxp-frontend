import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface MicroCardProps extends PartComponentProps {
    descriptor: PartType.MicroCard;
    config: {
        microcard: string;
    };
}