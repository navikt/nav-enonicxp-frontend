import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface IngressProps extends PartComponentProps {
    descriptor: PartType.HtmlArea;
    config: {
        ingress: string;
    };
}
