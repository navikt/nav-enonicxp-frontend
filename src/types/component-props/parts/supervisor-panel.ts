import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ProcessedHtmlProps } from '../../processed-html-props';

export interface DynamicSupervisorPanel extends PartComponentProps {
    descriptor: PartType.SupervisorPanel;
    config: {
        content: ProcessedHtmlProps;
        margin: string;
    };
}
