import { ProcessedHtmlProps } from 'types/processed-html-props';
import { OptionSetSingle } from 'types/util-types';

type ExternalOption = any;
type InternalOption = any;
type NextOption = any;

export type StepOptions = {
    external?: ExternalOption;
    internal?: InternalOption;
    next?: NextOption;
};

export type SelectableStep = {
    label: string;
    explanation: string;
    languageDisclaimer?: string;
    nextStep: OptionSetSingle<StepOptions>;
};

export type StepBase = {
    editorial: ProcessedHtmlProps;
    stepsHeadline: string;
    steps: SelectableStep[];
};
