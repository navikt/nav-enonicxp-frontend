import React, { useEffect, useState } from 'react';
import { Button, Heading, LinkPanel } from '@navikt/ds-react';
import { translator } from 'translations';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';
import {
    CompoundedSteps,
    FirstLevelStep,
    FormIntermediateStepPageProps,
    SecondLevelStep,
} from 'types/content-props/form-intermediate-step';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { usePageContentProps } from 'store/pageContext';
import { useRouter } from 'next/router';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { InfoBox } from 'components/_common/info-box/InfoBox';
import { ContentPropsForThemedPageHeader } from 'components/_common/headers/themed-page-header/themedPageHeaderUtils';
import { stripXpPathPrefix } from 'utils/urls';
import { useFormIntermediateStepPageState } from 'components/pages/form-intermediate-step-page/useFormIntermediateStepPageState';

import style from './FormIntermediateStepPage.module.scss';

export const FormIntermediateStepPage = (
    props: FormIntermediateStepPageProps
) => {
    const { data, language } = props;

    const {
        currentStepData,
        prevSelectedStep,
        getOnClickFromStep,
        getUrlFromStep,
    } = useFormIntermediateStepPageState(props);

    const router = useRouter();

    const getTranslations = translator('form', language);

    return (
        <div className={style.formIntermediateStepPage}>
            <ThemedPageHeader
                contentProps={{
                    ...props,
                    data: {
                        ...props.data,
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
                        {currentStepData.steps.map((step, index) => {
                            return (
                                <li key={step.label} className={style.stepItem}>
                                    {step.languageDisclaimer && (
                                        <InfoBox>
                                            {step.languageDisclaimer}
                                        </InfoBox>
                                    )}
                                    <LinkPanel
                                        href={getUrlFromStep(step)}
                                        onClick={getOnClickFromStep(
                                            step,
                                            index
                                        )}
                                        className={style.stepAction}
                                        analyticsComponent={'mellomsteg'}
                                        analyticsLinkGroup={
                                            currentStepData.stepsHeadline
                                        }
                                        analyticsLabel={step.label}
                                        as={LenkeBase}
                                    >
                                        <LinkPanel.Title>
                                            {step.label}
                                        </LinkPanel.Title>
                                        <LinkPanel.Description>
                                            {step.explanation}
                                        </LinkPanel.Description>
                                    </LinkPanel>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {prevSelectedStep !== null && (
                    <div className={style.buttonGroup}>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(
                                    window.location.pathname,
                                    undefined,
                                    {
                                        shallow: true,
                                    }
                                );
                            }}
                            variant={'tertiary'}
                            className={style.backButton}
                            as={LenkeBase}
                            href={router.asPath}
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
