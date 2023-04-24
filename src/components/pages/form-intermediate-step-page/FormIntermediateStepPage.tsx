import React from 'react';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';

import { FormIntermediateStepPageProps } from 'types/content-props/form-intermediate-step';
import { ContentCommonProps } from 'types/content-props/_content-common';
import {
    BodyLong,
    Button,
    Detail,
    Heading,
    Radio,
    RadioGroup,
} from '@navikt/ds-react';
import { forceArray } from 'utils/arrays';

import styles from './FormIntermediateStepPage.module.scss';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { useRouter } from 'next/router';

export const FormIntermediateStepPage = (
    props: FormIntermediateStepPageProps & ContentCommonProps
) => {
    const { data } = props;
    const router = useRouter();

    const [currentPage, setCurrentPage] = React.useState(0);
    const [selectionPath, setSelectionPath] = React.useState<number[]>([0, 0]);

    const getStepsFromNestedDataStructure = (_currentPage: number) => {
        if (_currentPage === 0) {
            return {
                editorial: data.editorial,
                stepsHeadline: data.stepsHeadline,
                steps: forceArray(data.steps).map((step) => ({
                    label: step.label,
                    explanation: step.explanation,
                    externalUrl: step.nextStep.external?.externalUrl,
                })),
            };
        }
        if (_currentPage === 1) {
            const stepDetails = data.steps[selectionPath[0]].nextStep;
            console.log(data.steps);
            return {
                editorial: stepDetails.next.editorial,
                stepsHeadline: stepDetails.next.stepsHeadline,
                steps: forceArray(stepDetails.next.steps),
            };
        }
    };

    const onSelectionChange = (val: any) => {
        const updatedPath = [...selectionPath];
        updatedPath[currentPage] = parseInt(val, 10);
        setSelectionPath([...updatedPath]);
    };

    const nextPage = () => {
        const currentPageStepData =
            getStepsFromNestedDataStructure(currentPage);
        const nextPageToGoTo =
            currentPageStepData.steps[selectionPath[currentPage]];
        if (nextPageToGoTo.externalUrl) {
            router.push(nextPageToGoTo.externalUrl);
        } else {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const stepsData = getStepsFromNestedDataStructure(currentPage);
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
                    <RadioGroup
                        name="stepOptions"
                        defaultValue={0}
                        legend={stepsData.stepsHeadline}
                        onChange={onSelectionChange}
                    >
                        {stepsData.steps.map((step, index) => (
                            <div key={step.label}>
                                <Radio value={index}>
                                    {step.label}
                                    <Detail>{step.explanation}</Detail>
                                </Radio>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
                <div className={styles.buttonGroup}>
                    <Button onClick={nextPage}>Neste</Button>
                    {currentPage > 0 && (
                        <Button onClick={prevPage} variant="secondary">
                            Tilbake
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
