import { ProcessedHtmlProps } from 'types/processed-html-props';
import { OptionSetSingle } from 'types/util-types';

type ExternalOption = {
    formNumber?: string;
    externalUrl?: string;
};
type InternalOption = {
    internalContent: {
        _path: string;
    };
};
type NextOption = {
    steps: Array<{
        label: string;
        explanation?: string;
        languageDisclaimer?: string;
        nextStep: OptionSetSingle<StepOptions>;
    }>;
};

export type StepOptions = {
    external?: ExternalOption;
    internal?: InternalOption;
    next?: NextOption;
};

export type SelectableStep = {
    formNumber?: string;
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
