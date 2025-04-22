import { ProcessedHtmlProps } from 'types/processed-html-props';
import { OptionSetSingle } from 'types/util-types';

//TODO: gjør noe med any?
type ExternalOption = any;
// {
//     external: {
//         formNumber?: string;
//         externalUrl?: string;
//     };
// };
type InternalOption = any;
type NextOption = any;

export type StepOptions = {
    external?: ExternalOption;
    internal?: InternalOption;
    next?: NextOption;
};

export type SelectableStep = {
    formNumber?: string;
    defaultFormNumber?: string;
    label: string;
    explanation?: string;
    languageDisclaimer?: string;
    nextStep: OptionSetSingle<StepOptions>;
};

export type StepBase = {
    textAboveTitle?: string;
    title?: string;
    editorial?: ProcessedHtmlProps;
    steps: SelectableStep[];
    previousStepExplanation?: string;
};
