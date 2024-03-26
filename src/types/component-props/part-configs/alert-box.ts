import { ProcessedHtmlProps } from 'types/processed-html-props';

export type PartConfigAlertBox = {
    content: ProcessedHtmlProps;
    type: 'info' | 'advarsel' | 'feil' | 'suksess';
    size?: 'small' | 'medium';
    inline?: boolean;
    margin: string;
};
