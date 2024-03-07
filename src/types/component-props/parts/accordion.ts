import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
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
