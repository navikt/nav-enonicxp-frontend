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

import style from './FormIntermediateStepPage.module.scss';

const STEP_PARAM = 'stegvalg';

export const FormIntermediateStepPage = (
    props: FormIntermediateStepPageProps
) => {
    const { data } = props;
    const router = useRouter();

    const { language } = usePageContentProps();
    const [prevSelectedStep, setPrevSelectedStep] = useState<number | null>(
        null
    );

    const getTranslations = translator('form', language);

    const getStateFromQuery = (url: string) => {
        const stepQuery = new URL(url, window.location.origin).searchParams.get(
            STEP_PARAM
        );

        return stepQuery ? Number(stepQuery) : null;
    };

    useEffect(() => {
        if (!router) {
            return;
        }

        const handleRouteChange = (url: string) => {
            setPrevSelectedStep(getStateFromQuery(url));
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    useEffect(() => {
        setPrevSelectedStep(getStateFromQuery(router.asPath));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStepData = (): CompoundedSteps | null => {
        if (prevSelectedStep === null) {
            return {
                editorial: data.editorial,
                stepsHeadline: data.stepsHeadline,
                steps: data.steps,
            };
        }

        const stepDetails = data.steps[prevSelectedStep].nextStep;
        return stepDetails?._selected === 'next' ? stepDetails.next : null;
    };

    const getOnClickFromStep = (
        step: FirstLevelStep | SecondLevelStep,
        index: number
    ) => {
        return step.nextStep?._selected !== 'next'
            ? undefined
            : (e: React.MouseEvent) => {
                  e.preventDefault();
                  router.push(
                      `${window.location.pathname}?${STEP_PARAM}=${index}`,
                      undefined,
                      {
                          shallow: true,
                      }
                  );
              };
    };

    const getUrlFromStep = (step: FirstLevelStep | SecondLevelStep) => {
        if (step.nextStep?._selected === 'external') {
            return step.nextStep?.external?.externalUrl;
        }

        if (step.nextStep?._selected === 'internal') {
            return stripXpPathPrefix(
                step.nextStep?.internal?.internalContent._path
            );
        }

        return router.asPath;
    };

    const themedPageHeaderProps: ContentPropsForThemedPageHeader = {
        ...props,
        data: {
            ...props.data,
            taxonomy: [],
        },
    };

    const currentStepData = getStepData();

    return (
        <div className={style.formIntermediateStepPage}>
            <ThemedPageHeader
                contentProps={themedPageHeaderProps}
                showTimeStamp={false}
            />
            <div className={style.content}>
                <div className={style.stepOptionsWrapper}>
                    <ParsedHtml htmlProps={currentStepData.editorial} />
                    {currentStepData.stepsHeadline && (
                        <Heading level="2" size="medium" spacing>
                            {currentStepData.stepsHeadline}
                        </Heading>
                    )}
                    <ul className={style.stepList}>
                        {currentStepData.steps.map((step, index: number) => {
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
                                        analyticsComponent="mellomsteg"
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
                            variant="tertiary"
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
