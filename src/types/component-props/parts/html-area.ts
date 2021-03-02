import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';

export interface HtmlAreaProps extends PartComponentProps {
    descriptor: PartType.HtmlArea;
    config: {
        html: string;
        title?: string;
    };
}
