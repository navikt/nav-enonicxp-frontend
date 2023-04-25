import React from 'react';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';

import {
    FormIntermediateStepPageProps,
    SimpleStep,
    StepDetails,
} from 'types/content-props/form-intermediate-step';
import { ContentCommonProps } from 'types/content-props/_content-common';
import { Button, Heading, LinkPanel } from '@navikt/ds-react';

import styles from './FormIntermediateStepPage.module.scss';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { useRouter } from 'next/router';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';

export const FormIntermediateStepPage = (
    props: FormIntermediateStepPageProps & ContentCommonProps
) => {
    const { data } = props;
    const router = useRouter();

    const [currentPage, setCurrentPage] = React.useState(0);
    const [selectionPath, setSelectionPath] = React.useState<number[]>([0, 0]);

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

    const handlePanelClick = (index: number, step: SimpleStep) => {
        const updatedPath = [...selectionPath];
        updatedPath[currentPage] = index;
        setSelectionPath([...updatedPath]);
        activateNextStep(updatedPath);

        const analyticsData = {
            komponent: 'mellomsteg',
            seksjon: 'steg-2',
            destinasjon: router.asPath,
            lenketekst: step.label,
        };

        logAmplitudeEvent(AnalyticsEvents.NAVIGATION, analyticsData);
    };

    const activateNextStep = (updatedPath) => {
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

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const stepsData = buildStepObjectFromNestedStructure(currentPage);
    const modifiedProps = {
        ...props,
        data: { ...props.data, taxonomy: [] },
    };

    return (
        <div className={styles.formIntermediateStepPage}>
            <ThemedPageHeader
                contentProps={modifiedProps}
                showTimeStamp={false}
            />
            <div className={styles.content}>
                <div className={styles.stepOptionsWrapper}>
                    <ParsedHtml htmlProps={stepsData.editorial} />
                    {stepsData.stepsHeadline && (
                        <Heading level="2" size="small" spacing>
                            {stepsData.stepsHeadline}
                        </Heading>
                    )}
                    <ul className={styles.stepList}>
                        {stepsData.steps.map((step, index) => (
                            <li key={step.label}>
                                {' '}
                                <LinkPanel
                                    value={index}
                                    as="button"
                                    onClick={() =>
                                        handlePanelClick(index, step)
                                    }
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
                        ))}
                    </ul>
                </div>
                <div className={styles.buttonGroup}>
                    {currentPage > 0 && (
                        <Button onClick={prevPage} variant="tertiary">
                            Tilbake
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
