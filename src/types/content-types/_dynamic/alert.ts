import { PartType } from '../_schema';

export interface DynamicAlert {
    type: 'part';
    path: string;
    descriptor: PartType.Alert;
    regions: undefined;
    part: {
        config: {
            no_nav_navno: {
                dynamic_alert: {
                    type: 'info' | 'suksess' | 'advarsel' | 'feil';
                    content: string;
                };
            };
        };
    };
}
