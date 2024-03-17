import { LinkSelectable } from '../_mixins';

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

export type PartConfigAreaCard = {
    link: LinkSelectable;
    area: AreaCardGraphicsType;
};
