import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { SituationPageProps } from '../../../types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';

import styles from './FormIntermediateStepPage.module.scss';
import {
    BodyLong,
    Button,
    Detail,
    Heading,
    Radio,
    RadioGroup,
} from '@navikt/ds-react';
import { forceArray } from 'utils/arrays';

export const FormIntermediateStepPage = (props: SituationPageProps) => {
    const stepOptions = forceArray((props as any).data.stepOptions);

    console.log(stepOptions);

    return (
        <div>
            <ThemedPageHeader contentProps={props} />
            <div className={'content'}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
            <div className={styles.stepOptionsWrapper}>
                <BodyLong spacing>
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
                </BodyLong>
                <Button>Neste</Button>
            </div>
        </div>
    );
};
