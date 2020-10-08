import { GlobalSchema, PartType } from '../_schema';

export interface DynamicLinkPanel {
    type: 'part';
    path: string;
    descriptor: PartType.LinkPanel;
    regions: undefined;
    part: {
        descriptor: PartType.LinkPanel;
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
