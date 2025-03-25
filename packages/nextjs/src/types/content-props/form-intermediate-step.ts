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
    formNumberStepData: string | undefined;
    label: string;
    explanation: string;
    languageDisclaimer?: string;
    nextStep: OptionSetSingle<StepOptions>;
};

export type StepBase = {
    textAboveTitle?: string;
    title?: string;
    editorial: ProcessedHtmlProps;
    steps: SelectableStep[];
};
