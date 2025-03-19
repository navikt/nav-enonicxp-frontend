import React from 'react';
import { Button, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import { ThemedPageHeader } from 'components/_common/headers/themedPageHeader/ThemedPageHeader';
import { FormIntermediateStepPageProps } from 'types/content-props/form-intermediate-step';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { useFormIntermediateStepPage } from 'components/pages/form-intermediate-step-page/useFormIntermediateStepPage';
import { FormIntermediateStepLink } from 'components/pages/form-intermediate-step-page/FormIntermediateStepLink';

import style from './FormIntermediateStepPage.module.scss';

export const FormIntermediateStepPage = (props: FormIntermediateStepPageProps) => {
    const { language, type, displayName, modifiedTime, data } = props;
    const { title, illustration } = data;

    const { currentStepData, backUrl } = useFormIntermediateStepPage(props);

    const getTranslations = translator('form', language);

    return (
        <div className={style.formIntermediateStepPage}>
            <ThemedPageHeader
                contentProps={{
                    type,
                    displayName,
                    modifiedTime,
                    language,
                    data: {
                        title,
                        illustration,
                        taxonomy: [],
                    },
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
