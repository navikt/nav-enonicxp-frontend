import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { ErrorProps } from 'types/content-props/error-props';
import { ErrorFeedbackLink } from './feedback-link/ErrorFeedbackLink';

export const ErrorContentDefault = (props: ErrorProps) => {
    return (
        <>
            <BodyLong spacing={true}>
                {
                    'Det oppsto en feil som hindret denne siden fra å laste. Du kan forsøke å laste inn siden på nytt.'
                }
            </BodyLong>
            <ErrorFeedbackLink errorId={props.data.errorId} />
        </>
    );
};
