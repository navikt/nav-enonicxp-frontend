import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface DynamicSupervisorPanel extends PartComponentProps {
    descriptor: PartType.SupervisorPanel;
    config: {
        content: string;
        margin: string;
    };
}
