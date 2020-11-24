import { GlobalContentProps } from '../../content-props/_content-common';
import { PartType } from '../parts';

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
