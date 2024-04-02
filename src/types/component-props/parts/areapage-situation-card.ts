import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { SituationPageProps } from 'types/content-props/dynamic-page-props';

export interface AreapageSituationCardPartProps extends PartComponentProps {
    descriptor: PartType.AreapageSituationCard;
    config: {
        disabled: boolean;
        target: SituationPageProps;
    };
}
