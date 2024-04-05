import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { RenderOnAuthStateMixin } from 'types/component-props/_mixins';

export interface AlertBoxPartProps extends PartComponentProps {
    descriptor: PartType.AlertBox;
    config: {
        content: ProcessedHtmlProps;
        type: 'info' | 'advarsel' | 'feil' | 'suksess';
        size?: 'small' | 'medium';
        inline?: boolean;
        margin: string;
    } & RenderOnAuthStateMixin;
}
