import React from 'react';
import { Button, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';
import { FormIntermediateStepPageProps } from 'types/content-props/form-intermediate-step';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { useFormIntermediateStepPageState } from 'components/pages/form-intermediate-step-page/useFormIntermediateStepPageState';
import { FormIntermediateStepLink } from 'components/pages/form-intermediate-step-page/FormIntermediateStepLink';

import style from './FormIntermediateStepPage.module.scss';

export const FormIntermediateStepPage = (props: FormIntermediateStepPageProps) => {
    const { language } = props;

    const { currentStepData, backUrl } = useFormIntermediateStepPageState(props);

    const getTranslations = translator('form', language);

    return (
        <div className={style.formIntermediateStepPage}>
            <ThemedPageHeader
                contentProps={{
                    // ...props,
                    type: props.type,
                    displayName: props.displayName,
                    modifiedTime: props.modifiedTime,
                    // data: {
                    //     // ...props.data,
                    //     title: props.data.title,
                    //     illustration: props.data.illustration,
                    //     taxonomy: [],
                    // },
                }}
                showTimeStamp={false}
            />
            <div className={style.content}>
                <div className={style.stepOptionsWrapper}>
                    <ParsedHtml htmlProps={currentStepData.editorial} />
                    {currentStepData.stepsHeadline && (
                        <Heading level={'2'} size={'medium'} spacing>
                            {currentStepData.stepsHeadline}
                        </Heading>
                    )}
                    <ul className={style.stepList}>
                        {currentStepData.steps.map((step) => (
                            <li key={step.label} className={style.stepItem}>
                                <FormIntermediateStepLink
                                    {...step}
                                    className={style.stepAction}
                                    analyticsComponent={'mellomsteg'}
                                    analyticsLinkGroup={currentStepData.stepsHeadline}
                                    analyticsLabel={step.label}
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
                            className={style.backButton}
                            analyticsComponent={'mellomsteg'}
                            analyticsLinkGroup={currentStepData.stepsHeadline}
                            analyticsLabel={'Tilbake'}
                        >
                            {getTranslations('back')}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
