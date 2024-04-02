import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import {
    ExpandableMixin,
    FiltersMixin,
    RenderOnAuthStateMixin,
} from 'types/component-props/_mixins';
import { ProcessedHtmlProps } from 'types/processed-html-props';

export interface HtmlAreaProps extends PartComponentProps {
    descriptor: PartType.HtmlArea;
    config: {
        html: ProcessedHtmlProps;
    } & ExpandableMixin &
        FiltersMixin &
        RenderOnAuthStateMixin;
}
