import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ProcessedHtmlProps } from '../../processed-html-props';
import { RenderOnAuthStateMixin } from '../_mixins';

export interface DynamicAlert extends PartComponentProps {
    descriptor: PartType.Alert;
    config: {
        type: 'info' | 'suksess' | 'advarsel' | 'feil';
        inline: string;
        content: ProcessedHtmlProps;
        margin: string;
    } & RenderOnAuthStateMixin;
}
