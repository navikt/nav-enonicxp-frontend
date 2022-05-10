import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface AlertPanelPartProps extends PartComponentProps {
    descriptor: PartType.AlertPanel;
    config: {
        link: string;
        header: string;
        ingress?: string;
    };
}
