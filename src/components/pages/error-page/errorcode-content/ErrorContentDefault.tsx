import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';
import { ErrorProps } from '../../../../types/content-props/error-props';

export const ErrorContentDefault = (props: ErrorProps) => {
    const { errorId } = props.data;

    return (
        <>
            <BodyLong spacing={true}>
                {
                    'Det oppsto en feil som hindret denne siden fra å laste. Du kan forsøke å laste inn siden på nytt.'
                }
            </BodyLong>
            <BodyLong spacing={true}>
                {'Dersom problemet vedvarer kan du '}
                <LenkeInline
                    href={
                        'https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler'
                    }
                >
                    {'melde fra om teknisk feil.'}
                </LenkeInline>
                {errorId
                    ? " Inkluder gjerne feil-id'en under i din tilbakemelding."
                    : ''}
            </BodyLong>
            {errorId && <BodyLong size={'s'}>{`Feil-id: ${errorId}`}</BodyLong>}
        </>
    );
};
