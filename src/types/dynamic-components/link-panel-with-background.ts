import { GlobalSchema } from '../content-types/_schema';

export interface DynamicLinkPanelWithBackground {
    type: 'part';
    path: string;
    descriptor: 'no.nav.navno:link-panel-with-background';
    regions: undefined;
    part: {
        config: {
            no_nav_navno: {
                link_panel_with_background: {
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
