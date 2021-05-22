import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ProcessedHtmlProps } from '../../processed-html-props';

export interface DynamicReadMorePanel extends PartComponentProps {
    descriptor: PartType.ReadMorePanel;
    config: {
        ingress: ProcessedHtmlProps;
        content: ProcessedHtmlProps;
        border: string;
        margin: string;
    };
}
