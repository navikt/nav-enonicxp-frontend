import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { SituationPageProps } from '../../../types/content-props/dynamic-page-props';
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

export const FormIntermediateStepPage = (
    props: FormIntermediateStepPageProps & ContentCommonProps
) => {
    const { data } = props;
    const stepOptions = forceArray(data.stepOptions);

    console.log(stepOptions);

    return (
        <div>
            <ThemedPageHeader contentProps={props} />
            <div className={styles.stepOptionsWrapper}>
                <ParsedHtml htmlProps={data.editorial} />
                <RadioGroup
                    name="stepOptions"
                    defaultValue={0}
                    legend="Hvordan vil du sende søknaden?"
                >
                    {stepOptions.map((option, index) => (
                        <div key={option.label}>
                            <Radio value={index}>
                                {option.label}
                                <Detail>{option.explanation}</Detail>
                            </Radio>
                        </div>
                    ))}
                </RadioGroup>
                <Button>Neste</Button>
            </div>
        </div>
    );
};
