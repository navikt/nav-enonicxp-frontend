import React, { useEffect, useState } from 'react';
import { Button, Heading, LinkPanel } from '@navikt/ds-react';
import { translator } from 'translations';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';
import { FormIntermediateStepPageProps } from 'types/content-props/form-intermediate-step';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { useRouter } from 'next/compat/router';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { InfoBox } from 'components/_common/info-box/InfoBox';

import styles from './FormIntermediateStepPage.module.scss';

const STEP_PARAM = 'stegvalg';

export const FormIntermediateStepPage = (
    props: FormIntermediateStepPageProps
) => {
    const { data } = props;
    const router = useRouter();

    const { language } = usePageConfig();
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

    const getStepData = () => {
        if (prevSelectedStep !== null) {
            const stepDetails = data.steps[prevSelectedStep].nextStep;
            if (stepDetails?._selected === 'next') {
                return stepDetails.next;
            }
        }

        return {
            editorial: data.editorial,
            stepsHeadline: data.stepsHeadline,
            steps: data.steps,
        };
    };

    const getOnClickFromStep = (step, index: number) => {
        return step.nextStep?._selected === 'external'
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

    const getHrefFromStep = (step) => {
        return step.nextStep?.external?.externalUrl || router.asPath;
    };

    const themedPageHeaderProps = {
        ...props,
        data: {
            ...props.data,
            taxonomy: [],
        },
    };

    const currentStepData = getStepData();

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
                        <Heading level="2" size="medium" spacing>
                            {currentStepData.stepsHeadline}
                        </Heading>
                    )}
                    <ul className={styles.stepList}>
                        {currentStepData.steps.map(
                            (step: any, index: number) => {
                                return (
                                    <li
                                        key={step.label}
                                        className={styles.stepItem}
                                    >
                                        {step.languageDisclaimer && (
                                            <InfoBox>
                                                {step.languageDisclaimer}
                                            </InfoBox>
                                        )}
                                        <LinkPanel
                                            href={getHrefFromStep(step)}
                                            onClick={getOnClickFromStep(
                                                step,
                                                index
                                            )}
                                            className={styles.stepAction}
                                            as={(props) => (
                                                <LenkeBase
                                                    analyticsComponent="mellomsteg"
                                                    analyticsLinkGroup={currentStepData.stepsHeadline}
                                                    analyticsLabel={step.label}
                                                    {...props}
                                                >
                                                    {props.children}
                                                </LenkeBase>
                                            )}
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
                            }
                        )}
                    </ul>
                </div>
                {prevSelectedStep !== null && (
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
