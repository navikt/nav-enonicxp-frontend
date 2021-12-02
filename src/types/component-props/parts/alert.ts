import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ProcessedHtmlProps } from '../../processed-html-props';
import { RenderOnAuthStateMixin } from '../_mixins';
import { AlertTypeLegacy } from '../../../components/_common/alert-stripe/AlertStripe';

export interface AlertPartProps extends PartComponentProps {
    descriptor: PartType.Alert;
    config: {
        type: AlertTypeLegacy;
        content: ProcessedHtmlProps;
        margin: string;
    } & RenderOnAuthStateMixin;
}
