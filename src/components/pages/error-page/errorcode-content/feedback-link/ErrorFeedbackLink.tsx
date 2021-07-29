import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { LenkeInline } from '../../../../_common/lenke/LenkeInline';
import Config from '../../../../../config';

type Props = {
    errorId: string;
};

export const ErrorFeedbackLink = ({ errorId }: Props) => {
    return (
        <>
            <BodyLong spacing={true}>
                {'Dersom problemet vedvarer kan du '}
                <LenkeInline href={Config.urls.errorFeedback}>
                    {'melde fra om teknisk feil.'}
                </LenkeInline>
                {errorId &&
                    " Inkluder gjerne feil-id'en under i din tilbakemelding."}
            </BodyLong>
            {errorId && <BodyLong size={'s'}>{`Feil-id: ${errorId}`}</BodyLong>}
        </>
    );
};
