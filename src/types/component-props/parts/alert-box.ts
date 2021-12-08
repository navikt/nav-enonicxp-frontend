import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ProcessedHtmlProps } from '../../processed-html-props';
import { RenderOnAuthStateMixin } from '../_mixins';

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
