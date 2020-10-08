import { PartType } from '../_schema';

export interface DynamicReadMorePanel {
    part: {
        descriptor: PartType.ReadMorePanel;
        config: {
            no_nav_navno: {
                dynamic_read_more_panel: {
                    ingress: string;
                    content: string;
                    border: string;
                    margin: string;
                };
            };
        };
    };
}
