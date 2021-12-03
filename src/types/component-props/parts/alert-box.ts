import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ProcessedHtmlProps } from '../../processed-html-props';
import { RenderOnAuthStateMixin } from '../_mixins';

export interface AlertBoxPartProps extends PartComponentProps {
    descriptor: PartType.AlertBox;
    config: {
        type: 'info' | 'advarsel' | 'feil' | 'suksess';
        size: 'small' | 'medium';
        content: ProcessedHtmlProps;
        margin: string;
    } & RenderOnAuthStateMixin;
}
