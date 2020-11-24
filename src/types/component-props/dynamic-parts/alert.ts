import { PartType } from '../../content-props/_content-common';

export interface DynamicAlert {
    type: 'part';
    path: string;
    descriptor: PartType.Alert;
    regions: undefined;
    part: {
        descriptor: PartType.Alert;
        config: {
            no_nav_navno: {
                dynamic_alert: {
                    type: 'info' | 'suksess' | 'advarsel' | 'feil';
                    inline: string;
                    content: string;
                    margin: string;
                };
            };
        };
    };
}
