import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { SituationPageProps } from '../../content-props/dynamic-page-props';

export interface AreapageSituationCardPartProps extends PartComponentProps {
    descriptor: PartType.AreapageSituationCard;
    config: {
        disabled: boolean;
        target: SituationPageProps;
    };
}
