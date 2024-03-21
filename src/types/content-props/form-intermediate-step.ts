import { ProcessedHtmlProps } from 'types/processed-html-props';
import { ContentCommonProps, ContentType } from './_content-common';
import { Taxonomy } from 'types/taxonomies';
import { OptionSetSingle } from 'types/util-types';

type ExternalStep = {
    externalUrl: string;
};

type InternalStep = {
    internalContent: ContentCommonProps;
};

type StepMeta<T> = {
    editorial: ProcessedHtmlProps;
    stepsHeadline: string;
    steps: T[];
};

type BaseStep = {
    label: string;
    explanation: string;
    languageDisclaimer?: string;
};

export type FirstLevelStep = BaseStep & {
    nextStep: OptionSetSingle<{
        next: StepMeta<SecondLevelStep>;
        external: ExternalStep;
        internal: InternalStep;
    }>;
};

export type SecondLevelStep = BaseStep & {
    nextStep: OptionSetSingle<{
        external: ExternalStep;
        internal: InternalStep;
    }>;
};

export type CompoundedSteps = StepMeta<FirstLevelStep | SecondLevelStep>;

export type FormIntermediateStepPageProps = ContentCommonProps & {
    type: ContentType.FormIntermediateStepPage;
    data: {
        title: string;
        illustration: any;
        taxonomy?: Taxonomy[];
        customCategory: string;
    } & StepMeta<FirstLevelStep>;
};
