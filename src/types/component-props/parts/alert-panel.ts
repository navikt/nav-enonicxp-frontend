import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface AlertPanelPartProps extends PartComponentProps {
    descriptor: PartType.AlertPanel;
    config: {
        header: string;
        ingress?: string;
    };
}
