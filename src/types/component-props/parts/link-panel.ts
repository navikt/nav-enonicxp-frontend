import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { LinkWithIngressMixin } from '../_mixins';
import { XpImage } from '../../media';

interface LinkPanelConfig extends LinkWithIngressMixin {
    vertical: boolean;
    background: XpImage;
    icon: XpImage;
}

export interface DynamicLinkPanel extends PartComponentProps {
    descriptor: PartType.LinkPanel;
    config: Partial<LinkPanelConfig>;
}
