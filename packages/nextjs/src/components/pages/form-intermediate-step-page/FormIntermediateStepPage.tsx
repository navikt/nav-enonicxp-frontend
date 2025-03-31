import React from 'react';
import { Button, BodyLong } from '@navikt/ds-react';
import { translator } from 'translations';
import { StepBase } from 'types/content-props/form-intermediate-step';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { useFormIntermediateStepPage } from 'components/pages/form-intermediate-step-page/useFormIntermediateStepPage';
import { FormIntermediateStepLink } from 'components/_common/formIntermediateStepLink/FormIntermediateStepLink';
import { HeaderWithParent } from 'components/_common/headers/headerWithParent/HeaderWithParent';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { ContentCommonProps, ContentType } from 'types/content-props/_content-common';
import { PictogramsProps } from 'types/content-props/pictograms';
import { Taxonomy } from 'types/taxonomies';
import { StepVisualization } from 'components/pages/form-intermediate-step-page/step-visualization/StepVisualization';
import { MellomstegLayout } from 'components/layouts/mellomsteg/MellomstegLayout';

import style from './FormIntermediateStepPage.module.scss';

export type FormIntermediateStepPageProps = Pick<
    ContentCommonProps,
    '_path' | 'language' | 'displayName' | 'editorView'
> & {
    type: ContentType.FormIntermediateStepPage;
    data: {
        title: string;
        illustration: PictogramsProps;
        taxonomy?: Taxonomy[];
        formNumbers?: string[];
    } & StepBase;
};

export const FormIntermediateStepPage = (props: FormIntermediateStepPageProps) => {
    const { language, data, displayName } = props;
    const { illustration, formNumbers } = data;
    const { currentStepData, backUrl } = useFormIntermediateStepPage(props);

    const currentStepTitle = currentStepData.title ?? displayName;

    const getTranslations = translator('form', language);

    return (
        <>
            <MellomstegLayout>
                <IllustrationStatic illustration={illustration} className={style.pictogram} />
                <HeaderWithParent
                    contentProps={{ data: { title: currentStepTitle } }}
                    textAboveTitle={currentStepData.textAboveTitle}
                    className={style.header}
                    formNumbers={formNumbers}
                />
                <div className={style.content}>
                    {currentStepData.previousStepExplanation ? (
                        <BodyLong spacing>{currentStepData.previousStepExplanation}</BodyLong>
                    ) : (
                        currentStepData.editorial && (
                            <ParsedHtml htmlProps={currentStepData.editorial} />
                        )
                    )}
                    <ul className={style.stepList}>
                        {currentStepData.steps.map((step) => (
                            <li key={step.label} className={style.stepItem}>
                                <FormIntermediateStepLink
                                    {...step}
                                    className={style.stepAction}
                                    analyticsComponent={'mellomsteg'}
                                    analyticsLabel={step.label}
                                    formNumberStepData={step.formNumberStepData}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                {backUrl && (
                    <div className={style.buttonGroup}>
                        <Button
                            href={backUrl}
                            shallow={true}
                            as={LenkeBase}
                            variant={'tertiary'}
                            className={style.backLink}
                            analyticsComponent={'mellomsteg'}
                            analyticsLabel={'Tilbake'}
                        >
                            {getTranslations('back')}
                        </Button>
                    </div>
                )}
            </MellomstegLayout>
            {props.editorView === 'edit' && <StepVisualization steps={data.steps} />}
        </>
    );
};
