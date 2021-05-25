import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ExpandableMixin } from '../_mixins';
import { ProcessedHtmlProps } from '../../processed-html-props';

export interface HtmlAreaProps extends PartComponentProps {
    descriptor: PartType.HtmlArea;
    config: {
        html: ProcessedHtmlProps;
    } & ExpandableMixin;
}
