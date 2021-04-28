import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ExpandableMixin } from '../_mixins';

export interface HtmlAreaProps extends PartComponentProps {
    descriptor: PartType.HtmlArea;
    config: {
        html: string;
    } & ExpandableMixin;
}
