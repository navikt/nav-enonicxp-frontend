import React from 'react';
import { Alert } from '@navikt/ds-react';
import { ContentProps } from 'types/content-props/_content-common';

export const SamledeVarsler = ({ content }: { content: ContentProps }) => {
    const malgruppeErArbeidsgiver = content.data?.audience?._selected === 'employer';
    const path = content.data?.customPath;
    const pathIncludesArbeidsgiver = path?.includes('/arbeidsgiver');
    const feilKortUrl = malgruppeErArbeidsgiver && !pathIncludesArbeidsgiver;

    return (
        <>
            {feilKortUrl && (
                <Alert variant="warning">
                    Det er problemer med denne siden som må rettes:
                    <ul>
                        {feilKortUrl ? (
                            <li>
                                Målgruppe er satt til Arbeidsgiver, så kort-url må også starte med
                                {' "/arbeidsgiver"'}
                            </li>
                        ) : null}
                    </ul>
                    Dette varselet er kun synlig for redaktører.
                </Alert>
            )}
        </>
    );
};
