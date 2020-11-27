import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface DynamicReadMorePanel extends PartComponentProps {
    descriptor: PartType.ReadMorePanel;
    config: {
        ingress: string;
        content: string;
        border: string;
        margin: string;
    };
}
