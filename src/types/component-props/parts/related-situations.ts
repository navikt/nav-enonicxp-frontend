import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';

export interface RelatedSituationsProps extends PartComponentProps {
    descriptor: PartType.RelatedSituations;
    config: {
        title: string;
        description: string;
    };
}
