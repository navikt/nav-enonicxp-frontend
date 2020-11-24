import { PartComponent } from '../_component-common';
import { PartType } from '../parts';

export interface DynamicSupervisorPanel extends PartComponent {
    descriptor: PartType.SupervisorPanel;
    config: {
        content: string;
        margin: string;
    };
}
