import React, { useEffect, useState } from 'react';
import { Button, Heading, LinkPanel } from '@navikt/ds-react';
import { translator } from 'translations';

import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';
import {
    FormIntermediateStepPageProps,
    StepDetails,
} from 'types/content-props/form-intermediate-step';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { useRouter } from 'next/router';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';

import styles from './FormIntermediateStepPage.module.scss';
import LenkepanelNavNo from 'components/_common/lenkepanel-legacy/LenkepanelNavNo';

const STEP_PARAM = 'stegvalg';

export const FormIntermediateStepPage = (
    props: FormIntermediateStepPageProps
) => {
    const { data } = props;
    const router = useRouter();

    const { language } = usePageConfig();
    const [curentPageIndex, setCurrentPageIndex] = useState<number>(0);
    const [selectedSteps, setSelectedSteps] = useState<number[]>([]);

    const getTranslations = translator('form', language);

    const getStateFromQuery = (url: string) => {
        const stepQuery = new URL(url, window.location.origin).searchParams.get(
            STEP_PARAM
        );

        const steps = stepQuery
            ? stepQuery.split(',').map((step) => Number(step) || 0)
            : [];
        return { pageIndex: steps.length, steps };
    };

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            const { pageIndex, steps } = getStateFromQuery(url);
            setCurrentPageIndex(pageIndex);
            setSelectedSteps(steps);
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router, setSelectedSteps, setCurrentPageIndex]);

    useEffect(() => {
        const { pageIndex, steps } = getStateFromQuery(router.asPath);
        setCurrentPageIndex(pageIndex);
        setSelectedSteps(steps);
    }, []);

    const getStepData = () => {
        if (curentPageIndex === 1) {
            const stepDetails = data.steps[selectedSteps[0]].nextStep;
            if (stepDetails?._selected === 'next') {
                return stepDetails.next;
            }
        }

        return {
            editorial: data.editorial,
            stepsHeadline: data.stepsHeadline,
            steps: data.steps.map((step) => ({
                label: step.label,
                explanation: step.explanation,
                externalUrl:
                    step.nextStep._selected === 'external' &&
                    step.nextStep.external.externalUrl,
            })),
        };
    };

    const currentStepData = getStepData();

    const themedPageHeaderProps = {
        ...props,
        data: {
            ...props.data,
            taxonomy: [],
            customCategory: getTranslations('application'),
        },
    };

    const getOnClickFromStep = (step, index: number) => {
        return step.nextStep?._selected === 'external'
            ? undefined
            : (e: React.MouseEvent) => {
                  e.preventDefault();
                  router.push(
                      `${window.location.pathname}?${STEP_PARAM}=${selectedSteps
                          .concat(index)
                          .join(',')}`,
                      undefined,
                      {
                          shallow: true,
                      }
                  );
              };
    };

    const getHrefFromStep = (step) => {
        return step.nextStep?.external?.externalUrl || router.asPath;
    };

    return (
        <div className={styles.formIntermediateStepPage}>
            <ThemedPageHeader
                contentProps={themedPageHeaderProps}
                showTimeStamp={false}
            />
            <div className={styles.content}>
                <div className={styles.stepOptionsWrapper}>
                    <ParsedHtml htmlProps={currentStepData.editorial} />
                    {currentStepData.stepsHeadline && (
                        <Heading level="3" size="small" spacing>
                            {currentStepData.stepsHeadline}
                        </Heading>
                    )}
                    <ul className={styles.stepList}>
                        {currentStepData.steps.map(
                            (step: any, index: number) => {
                                return (
                                    <li key={step.label}>
                                        <LenkepanelNavNo
                                            href={getHrefFromStep(step)}
                                            onClick={getOnClickFromStep(
                                                step,
                                                index
                                            )}
                                            className={styles.stepOption}
                                            tittel={step.label}
                                        >
                                            {step.explanation}
                                        </LenkepanelNavNo>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </div>
                {curentPageIndex !== null && (
                    <div className={styles.buttonGroup}>
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
                            className={styles.backButton}
                            as={LenkeBase}
                            href={router.asPath}
                            analyticsComponent={'mellomsteg'}
                            analyticsLinkGroup={'steg-1'}
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
