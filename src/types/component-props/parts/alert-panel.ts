import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { LinkSelectable } from '../_mixins';

export interface AlertPanelPartProps extends PartComponentProps {
    descriptor: PartType.AlertPanel;
    config: {
        link: LinkSelectable;
        ingress?: string;
    };
}
