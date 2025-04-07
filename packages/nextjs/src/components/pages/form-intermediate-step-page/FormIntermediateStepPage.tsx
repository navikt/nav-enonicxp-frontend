import React from 'react';
import { StepBase } from 'types/content-props/form-intermediate-step';
import { useFormIntermediateStepPage } from 'components/pages/form-intermediate-step-page/useFormIntermediateStepPage';
import { FormIntermediateStepLink } from 'components/_common/formIntermediateStepLink/FormIntermediateStepLink';
import { ContentCommonProps, ContentType } from 'types/content-props/_content-common';
import { PictogramsProps } from 'types/content-props/pictograms';
import { MellomstegLayout } from 'components/layouts/mellomsteg/MellomstegLayout';
import { StepVisualization } from './step-visualization/StepVisualization';

export type FormIntermediateStepPageProps = Pick<ContentCommonProps, '_path' | 'editorView'> & {
    type: ContentType.FormIntermediateStepPage;
    data: {
        title: string;
        illustration: PictogramsProps;
        formNumbers?: string[];
        editorial?: string;
        textAboveTitle?: string;
    } & StepBase;
};

export const FormIntermediateStepPage = (props: FormIntermediateStepPageProps) => {
    const { data } = props;
    const { currentStepData, backUrl } = useFormIntermediateStepPage(props);

    return (
        <MellomstegLayout
            data={data}
            listItems={currentStepData.steps.map((step) => (
                <li key={step.label}>
                    <FormIntermediateStepLink
                        {...step}
                        analyticsComponent={'FormIntermediateStepPage'}
                        analyticsLabel={step.label}
                        formNumberStepData={step.formNumberStepData}
                    />
                </li>
            ))}
            backLink={{
                target: {
                    _path: backUrl ?? '',
                    displayName: backUrl ? 'Tilbake' : '',
                },
            }}
            analyticsComponent={'FormIntermediateStepPage'}
            editorView={props.editorView === 'edit' && <StepVisualization steps={data.steps} />}
        />
    );
};
