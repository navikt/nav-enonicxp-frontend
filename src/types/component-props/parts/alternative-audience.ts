import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';

export interface AlternativeAudienceProps extends PartComponentProps {
    descriptor: PartType.AlternativeAudience;
    config: {
        showProductName: boolean;
    };
}
