import { ProcessedHtmlProps } from 'types/processed-html-props';

export type PartConfigAccordion = {
    accordion: Array<{
        title: string;
        html: ProcessedHtmlProps;
    }>;
};
