import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { LinkSelectable } from 'types/component-props/_mixins';

export type AreaCardGraphicsType =
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
        area: AreaCardGraphicsType;
    };
}
