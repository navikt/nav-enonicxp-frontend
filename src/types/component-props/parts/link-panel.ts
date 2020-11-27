import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { LinkWithIngressMixin } from '../_mixins';

interface LinkPanelConfig extends LinkWithIngressMixin {
    vertical: boolean;
    background: {
        mediaUrl: string;
    };
    icon: {
        mediaUrl: string;
    };
}

export interface DynamicLinkPanel extends PartComponentProps {
    descriptor: PartType.LinkPanel;
    config: Partial<LinkPanelConfig>;
}
