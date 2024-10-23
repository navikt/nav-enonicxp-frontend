import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { ErrorProps } from 'types/content-props/error-props';
import { ErrorFeedbackLink } from './feedback-link/ErrorFeedbackLink';

export const ErrorContent408 = (props: ErrorProps) => {
    return (
        <>
            <BodyLong spacing={true}>
                {
                    'Siden kunne ikke lastes på grunn av tidsavbrudd. Dette er sannsynligvis en midlertidig feil, forsøk å laste siden på nytt.'
                }
            </BodyLong>
            <ErrorFeedbackLink errorId={props.data.errorId} />
        </>
    );
};
