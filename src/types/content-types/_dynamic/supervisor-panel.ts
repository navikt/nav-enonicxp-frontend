import { PartType } from '../_schema';

export interface DynamicSupervisorPanel {
    type: 'part';
    path: string;
    descriptor: PartType.SupervisorPanel;
    regions: undefined;
    part: {
        config: {
            no_nav_navno: {
                dynamic_supervisor_panel: {
                    content: string;
                    margin: string;
                };
            };
        };
    };
}
