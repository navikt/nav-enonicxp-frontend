import React, { useEffect, useState } from 'react';
import { Button, Heading, LinkPanel } from '@navikt/ds-react';
import { translator } from 'translations';

import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';
import { FormIntermediateStepPageProps } from 'types/content-props/form-intermediate-step';
import { ContentCommonProps } from 'types/content-props/_content-common';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { useRouter } from 'next/router';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';

import styles from './FormIntermediateStepPage.module.scss';

const STEP_PARAM = 'steg';

export const FormIntermediateStepPage = (
    props: FormIntermediateStepPageProps & ContentCommonProps
) => {
    const { data } = props;
    const router = useRouter();

    const { language } = usePageConfig();
    const [stepSelection, setStepSelection] = useState<number | null>(null);

    const getTranslations = translator('form', language);

    useEffect(() => {
        const handleRouteChange = (url) => {
            const step = new URL(url, window.location.origin).searchParams.get(
                STEP_PARAM
            );

            if (step) {
                setStepSelection(Number(step));
            } else {
                setStepSelection(null);
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    const getStepData = () => {
        if (stepSelection !== null) {
            const stepDetails = data.steps[stepSelection].nextStep;
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
                        {currentStepData.steps.map((step, index) => {
                            const onClick = step.externalUrl
                                ? undefined
                                : (e) => {
                                      e.preventDefault();
                                      router.push(
                                          `${window.location.pathname}?${STEP_PARAM}=${index}`,
                                          undefined,
                                          {
                                              shallow: true,
                                          }
                                      );
                                      setStepSelection(index);
                                  };

                            return (
                                <li key={step.label}>
                                    <LinkPanel
                                        href={step.externalUrl || router.asPath}
                                        onClick={onClick}
                                        className={styles.stepOption}
                                        as={LenkeBase}
                                        analyticsComponent={'mellomsteg'}
                                        analyticsLinkGroup={'steg-2'}
                                        analyticsLabel={step.label}
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
                {stepSelection !== null && (
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
