import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface UxSignalsWidgetPartProps extends PartComponentProps {
    descriptor: PartType.UxSignalsWidget;
    config: {
        embedCode: string;
    };
}
