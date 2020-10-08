import { PartType } from '../_schema';

export interface DynamicSupervisorPanel {
    part: {
        descriptor: PartType.SupervisorPanel;
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
