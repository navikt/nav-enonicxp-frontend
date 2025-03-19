import { ProcessedHtmlProps } from 'types/processed-html-props';
import { Taxonomy } from 'types/taxonomies';
import { OptionSetSingle } from 'types/util-types';
import { ContentCommonProps, ContentType } from './_content-common';
import { PictogramsProps } from './pictograms';

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

export type FormIntermediateStepPageProps = ContentCommonProps & {
    type: ContentType.FormIntermediateStepPage;
    data: {
        title: string;
        illustration: PictogramsProps;
        taxonomy?: Taxonomy[];
        customCategory: string;
    } & StepBase;
};
