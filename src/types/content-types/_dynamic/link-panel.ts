import { GlobalSchema } from '../_schema';

export interface DynamicLinkPanel {
    type: 'part';
    path: string;
    descriptor: 'no.nav.navno:link-panel-with-background';
    regions: undefined;
    part: {
        config: {
            no_nav_navno: {
                dynamic_link_panel: {
                    background: GlobalSchema & {
                        data: {
                            media: {
                                attachment: string;
                            };
                        };
                    };
                    description: string;
                    target: string;
                    title: string;
                };
            };
        };
    };
}
