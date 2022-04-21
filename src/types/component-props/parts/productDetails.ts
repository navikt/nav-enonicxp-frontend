import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface ProductDetailsProps extends PartComponentProps {
    descriptor: PartType.Calculator;
    config: Partial<{
        header?: string;
        productDetailsTarget: {
            data: any;
        };
    }>;
}
