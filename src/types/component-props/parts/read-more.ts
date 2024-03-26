import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';

export interface ReadMorePartProps extends PartComponentProps {
    descriptor: PartType.ReadMore;
    config: {
        title: string;
        html: ProcessedHtmlProps;
    };
}
