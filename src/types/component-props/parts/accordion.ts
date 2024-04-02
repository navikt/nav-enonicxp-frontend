import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';

export interface AccordionPartProps extends PartComponentProps {
    descriptor: PartType.Accordion;
    config: {
        accordion: {
            title: string;
            html: ProcessedHtmlProps;
        }[];
    };
}
