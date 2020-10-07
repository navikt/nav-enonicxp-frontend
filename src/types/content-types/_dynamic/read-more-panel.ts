import { PartType } from '../_schema';

export interface DynamicReadMorePanel {
    type: 'part';
    path: string;
    descriptor: PartType.ReadMorePanel;
    regions: undefined;
    part: {
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
