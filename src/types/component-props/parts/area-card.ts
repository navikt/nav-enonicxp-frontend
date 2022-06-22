import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { LinkSelectable } from '../_mixins';

export type AreaCardType =
    | 'payments'
    | 'cases'
    | 'employment-status-form'
    | 'work'
    | 'family'
    | 'health'
    | 'accessibility'
    | 'pension'
    | 'social_counselling';

export interface AreaCardPartProps extends PartComponentProps {
    descriptor: PartType.AreaCard;
    config: {
        link: LinkSelectable;
        area: AreaCardType;
    };
}
