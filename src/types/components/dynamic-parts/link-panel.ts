import { GlobalContentProps, PartType } from '../../content/_common';

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
                    background: GlobalContentProps & {
                        mediaUrl: string;
                    };
                    description: string;
                    target: string;
                    title: string;
                };
            };
        };
    };
}
