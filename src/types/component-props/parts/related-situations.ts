import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface RelatedSituationsProps extends PartComponentProps {
    descriptor: PartType.RelatedSituations;
    config: {
        title: string;
        description: string;
    };
}
