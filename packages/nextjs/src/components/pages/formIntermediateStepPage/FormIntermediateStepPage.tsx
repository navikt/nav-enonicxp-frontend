import React, { useEffect } from 'react';
import { setParams } from '@navikt/nav-dekoratoren-moduler';
import { translator } from 'translations';
import { SelectableStep, StepBase } from 'types/content-props/form-intermediate-step';
import { useFormIntermediateStepPage } from 'components/pages/formIntermediateStepPage/useFormIntermediateStepPage';
import { FormIntermediateStepLink } from 'components/_common/formIntermediateStepLink/FormIntermediateStepLink';
import { ContentCommonProps, ContentType } from 'types/content-props/_content-common';
import { PictogramsProps } from 'types/content-props/pictograms';
import { MellomstegLayout } from 'components/layouts/mellomsteg/MellomstegLayout';
import { StepVisualization } from './step-visualization/StepVisualization';

export type FormIntermediateStepPageProps = Pick<
    ContentCommonProps,
    '_path' | 'displayName' | 'editorView' | 'language'
> & {
    type: ContentType.FormIntermediateStepPage;
    data: {
        title: string;
        illustration: PictogramsProps;
        formNumbers?: string[];
        editorial?: string;
        textAboveTitle?: string;
    } & StepBase;
};

export const getFormNumbers = (steps: SelectableStep[]): string[] => {
    return steps.flatMap((step) => {
        const formNumbers: string[] = [];
        if (step.nextStep?._selected === 'external' && step.nextStep.external?.formNumber) {
            formNumbers.push(step.nextStep.external.formNumber);
        }
        if (step.nextStep?._selected === 'next' && step.nextStep.next?.steps) {
            formNumbers.push(...getFormNumbers(step.nextStep.next.steps));
        }
        const uniqueFormNumbers = [...new Set(formNumbers)];
        return uniqueFormNumbers;
    });
};

export const FormIntermediateStepPage = (props: FormIntermediateStepPageProps) => {
    const { data, displayName, language } = props;
    const { currentStepData, backUrl } = useFormIntermediateStepPage(props);
    const getTranslations = translator('form', language);

    // Mellomsteg skal bruke simple decorator
    useEffect(() => {
        setParams({simple: true});

        return () => {
            setParams({simple: false});
        }
    }, []);

    return (
        <MellomstegLayout
            data={{
                ...data,
                textAboveTitle: currentStepData.textAboveTitle,
                title: currentStepData.title ?? displayName,
            }}
            listItems={currentStepData.steps.map((step) => (
                <li key={step.label}>
                    <FormIntermediateStepLink
                        {...step}
                        analyticsComponent={'FormIntermediateStepPage'}
                        analyticsLabel={step.label}
                        formNumber={step.formNumber}
                    />
                </li>
            ))}
            backLink={{
                target: {
                    _path: backUrl ?? '',
                    displayName: backUrl ? getTranslations('back') : '',
                },
            }}
            analyticsComponent={'FormIntermediateStepPage'}
            editorView={props.editorView === 'edit' && <StepVisualization steps={data.steps} />}
        />
    );
};
