import { PartComponent } from '../_component-common';
import { PartType } from '../parts';
import { GlobalContentProps } from '../../content-props/_content-common';
import { DeepPartial } from '../../util-types';

export interface DynamicLinkPanel extends PartComponent {
    descriptor: PartType.LinkPanel;
    config: DeepPartial<{
        title: string;
        ingress: string;
        target: GlobalContentProps;
        background: {
            mediaUrl: string;
        };
        icon: {
            mediaUrl: string;
        };
    }>;
}
