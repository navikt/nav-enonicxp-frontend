import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface AlternativeAudienceProps extends PartComponentProps {
    descriptor: PartType.AlternativeAudience;
    config: {
        showProductName: boolean;
    };
}
