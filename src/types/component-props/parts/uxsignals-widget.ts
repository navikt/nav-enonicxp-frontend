import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';

export interface UxSignalsWidgetPartProps extends PartComponentProps {
    descriptor: PartType.UxSignalsWidget;
    config: {
        embedCode: string;
    };
}
