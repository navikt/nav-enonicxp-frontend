import { ProcessedHtmlProps } from 'types/processed-html-props';
import { Taxonomy } from 'types/taxonomies';
import { OptionSetSingle } from 'types/util-types';
import { ContentCommonProps, ContentType } from './_content-common';
import { PictogramsProps } from './pictograms';

export type FormIntermediateStep_StepData<
    NextStep extends FormIntermediateStep_StepBase = FormIntermediateStep_StepBase,
> = {
    editorial: ProcessedHtmlProps;
    stepsHeadline: string;
    steps: NextStep[];
};

export type FormIntermediateStep_StepBase = {
    label: string;
    explanation: string;
    languageDisclaimer?: string;
};

type StepBaseOptions = {
    external: {
        externalUrl: string;
    };
    internal: {
        internalContent: ContentCommonProps;
    };
};

type StepLevel1 = FormIntermediateStep_StepBase & {
    nextStep: OptionSetSingle<
        StepBaseOptions & {
            next: FormIntermediateStep_StepData<StepLevel2>;
        }
    >;
};

type StepLevel2 = FormIntermediateStep_StepBase & {
    nextStep: OptionSetSingle<StepBaseOptions>;
};

export type FormIntermediateStep_StepLevel = StepLevel1 | StepLevel2;

export type FormIntermediateStep_CompoundedStepData =
    FormIntermediateStep_StepData<FormIntermediateStep_StepLevel>;

export type FormIntermediateStepPageProps = ContentCommonProps & {
    type: ContentType.FormIntermediateStepPage;
    data: {
        title: string;
        illustration: PictogramsProps;
        taxonomy?: Taxonomy[];
        customCategory: string;
    } & FormIntermediateStep_StepData<StepLevel1>;
};
