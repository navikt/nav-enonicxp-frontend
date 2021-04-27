import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { LinkWithIngressMixin } from '../_mixins';
import { XpImageProps } from '../../media';

interface LinkPanelConfig extends LinkWithIngressMixin {
    vertical: boolean;
    background: XpImageProps;
    icon: XpImageProps;
    iconBg: string;
}

export interface DynamicLinkPanel extends PartComponentProps {
    descriptor: PartType.LinkPanel;
    config: Partial<LinkPanelConfig>;
}
