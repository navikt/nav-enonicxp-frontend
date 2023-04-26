import React from 'react';
import { Button, Heading, LinkPanel } from '@navikt/ds-react';
import { useRouter } from 'next/router';
import { translator } from 'translations';

import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';
import { FormIntermediateStepPageProps } from 'types/content-props/form-intermediate-step';
import { ContentCommonProps } from 'types/content-props/_content-common';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { usePageConfig } from 'store/hooks/usePageConfig';

import styles from './FormIntermediateStepPage.module.scss';

export const FormIntermediateStepPage = (
    props: FormIntermediateStepPageProps & ContentCommonProps
) => {
    const { data } = props;

    const router = useRouter();
    const { language } = usePageConfig();
    const [currentPage, setCurrentPage] = React.useState(0);
    const [selectionPath, setSelectionPath] = React.useState<number[]>([0, 0]);

    const getTranslations = translator('form', language);

    const buildStepObjectFromNestedStructure = (_currentPage: number) => {
        if (_currentPage === 0) {
            return {
                editorial: data.editorial,
                stepsHeadline: data.stepsHeadline,
                steps: data.steps.map((step) => ({
                    label: step.label,
                    explanation: step.explanation,
                    externalUrl: step.nextStep.external?.externalUrl,
                })),
            };
        }
        if (_currentPage === 1) {
            const stepDetails = data.steps[selectionPath[0]].nextStep;
            return {
                editorial: stepDetails.next.editorial,
                stepsHeadline: stepDetails.next.stepsHeadline,
                steps: stepDetails.next.steps,
            };
        }
    };

    const backHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentPage(currentPage - 1);
        const analyticsData = {
            komponent: 'mellomsteg',
            seksjon: 'steg-1',
            destinasjon: router.asPath,
            lenketekst: 'Tilbake',
        };

        logAmplitudeEvent(AnalyticsEvents.NAVIGATION, analyticsData);
    };

    const nextHandler = (
        e: React.MouseEvent,
        clickedPanelIndex: number,
        label: string
    ) => {
        e.preventDefault();
        const newPath = [...selectionPath];
        newPath[currentPage] = clickedPanelIndex;
        setSelectionPath([...newPath]);
        gotoNextPage(newPath);

        const analyticsData = {
            komponent: 'mellomsteg',
            seksjon: 'steg-2',
            destinasjon: router.asPath,
            lenketekst: label,
        };

        logAmplitudeEvent(AnalyticsEvents.NAVIGATION, analyticsData);
    };

    const gotoNextPage = (updatedPath: number[]) => {
        // Need to drill down to find if the panel should lead
        // to a new step or an external url
        const currentPageStepData =
            buildStepObjectFromNestedStructure(currentPage);
        const nextPageToGoTo =
            currentPageStepData.steps[updatedPath[currentPage]];

        if (nextPageToGoTo.externalUrl) {
            router.push(nextPageToGoTo.externalUrl);
        } else {
            setCurrentPage(currentPage + 1);
        }
    };

    const currentStepData = buildStepObjectFromNestedStructure(currentPage);

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
                            const isLinkExternal = !!step.externalUrl;
                            const onClick = isLinkExternal
                                ? null
                                : (e) => nextHandler(e, index, step.label);

                            const href = isLinkExternal
                                ? step.externalUrl
                                : '#';

                            return (
                                <li key={step.label}>
                                    <LinkPanel
                                        href={href}
                                        onClick={onClick}
                                        className={styles.stepOption}
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
                <div className={styles.buttonGroup}>
                    {currentPage > 0 && (
                        <Button
                            onClick={(e) => backHandler(e)}
                            variant="tertiary"
                            as="a"
                            href="#"
                            className={styles.backButton}
                        >
                            {getTranslations('back')}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
