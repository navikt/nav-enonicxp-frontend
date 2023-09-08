import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { ErrorProps } from 'types/content-props/error-props';
import { ErrorFeedbackLink } from './feedback-link/ErrorFeedbackLink';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';
import Config from '../../../../config';
import { appOrigin } from 'utils/urls';
import { ERROR_MSG_URI_ERROR_PUBLIC } from 'utils/make-error-props';

export const ErrorContent400 = (props: ErrorProps) => {
    if (props.data.errorMessage === ERROR_MSG_URI_ERROR_PUBLIC) {
        return (
            <>
                <BodyLong>{'Den forespurte adressen er ikke gyldig:'}</BodyLong>
                <BodyLong spacing={true} size="small">
                    {`${appOrigin}${props._path}`}
                </BodyLong>
                <BodyLong spacing={true}>
                    {
                        'Dersom du fulgte en lenke på nav.no for å komme hit kan du '
                    }
                    <LenkeInline href={Config.urls.errorFeedback}>
                        {'melde fra om teknisk feil'}
                    </LenkeInline>
                    {' for den aktuelle lenken.'}
                </BodyLong>
            </>
        );
    }

    return (
        <>
            <BodyLong spacing={true}>
                {
                    'Siden kunne ikke lastes på grunn av en ugyldig forespørsel. Du kan forsøke å laste inn siden på nytt.'
                }
            </BodyLong>
            <ErrorFeedbackLink errorId={props.data.errorId} />
        </>
    );
};
