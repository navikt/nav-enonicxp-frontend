import { PartComponent } from '../_component-common';
import { PartType } from '../parts';
import { GlobalContentProps } from '../../content-props/_content-common';

export interface DynamicLinkPanel extends PartComponent {
    descriptor: PartType.LinkPanel;
    config: {
        title: string;
        ingress: string;
        target: GlobalContentProps;
        background: {
            mediaUrl: string;
        };
        icon: {
            mediaUrl: string;
        };
    };
}
