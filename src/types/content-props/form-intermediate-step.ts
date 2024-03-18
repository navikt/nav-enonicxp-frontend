import { ProcessedHtmlProps } from 'types/processed-html-props';
import { ContentCommonProps, ContentType } from './_content-common';
import { Taxonomy } from 'types/taxonomies';
import { OptionSetSingle } from 'types/util-types';

type ExternalStep = {
    externalUrl: string;
};

export type StepDetails = {
    label: string;
    explanation: string;
    languageDisclaimer?: string;
    nextStep: OptionSetSingle<{
        next: {
            editorial: ProcessedHtmlProps;
            stepsHeadline: string;
            steps: {
                label: string;
                explanation: string;
                languageDisclaimer?: string;
                nextStep: OptionSetSingle<{
                    external: ExternalStep;
                }>;
            }[];
        };
        external: ExternalStep;
    }>;
};

export type FormIntermediateStepPageProps = ContentCommonProps & {
    type: ContentType.FormIntermediateStepPage;
    data: {
        title: string;
        illustration: any;
        taxonomy?: Taxonomy[];
        customCategory: string;
        editorial: ProcessedHtmlProps;
        stepsHeadline: string;
        steps: StepDetails[];
    };
};
