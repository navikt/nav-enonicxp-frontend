import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ProcessedHtmlProps } from '../../processed-html-props';
import { RenderOnAuthStateMixin } from '../_mixins';

export type PartAlertType = 'info' | 'suksess' | 'advarsel' | 'feil';
export type PartAlertSize = 'small' | 'medium';

export interface AlertPartProps extends PartComponentProps {
    descriptor: PartType.Alert;
    config: {
        type: PartAlertType;
        size: PartAlertSize;
        content: ProcessedHtmlProps;
        margin: string;
    } & RenderOnAuthStateMixin;
}
