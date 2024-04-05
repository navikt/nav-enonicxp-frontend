import React, { useEffect, useState } from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { SearchForm } from './search-form/SearchForm';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';

import style from './ErrorContent404.module.scss';
import { fetchUrlSuggestion } from '../../../../utils/fetch/fetch-url-suggestion';

const origin = process.env.APP_ORIGIN;
const frontpageBase = origin;
const feedbackHref = `${origin}/person/kontakt-oss/tilbakemeldinger/feil-og-mangler`;

export const ErrorContent404 = () => {
    const [urlSuggestion, setUrlSuggestion] = useState(null);

    useEffect(() => {
        fetchUrlSuggestion(
            `${window.location.origin}${window.location.pathname}`
        ).then((res) => {
            setUrlSuggestion(res.suggestion);
        });
    }, []);

    return (
        <div className={style.error404}>
            <div>
                {urlSuggestion && (
                    <BodyLong>
                        {'Kanskje du mente '}
                        <LenkeInline href={urlSuggestion}>
                            {`nav.no${new URL(urlSuggestion).pathname}`}
                        </LenkeInline>
                    </BodyLong>
                )}
                <BodyLong>{'Du kan søke:'}</BodyLong>
                <SearchForm />
                <BodyLong>
                    {'Meld gjerne fra om '}
                    <LenkeInline href={feedbackHref}>
                        {'feil på lenken'}
                    </LenkeInline>
                </BodyLong>
            </div>

            <div className={style.enContent}>
                <Heading level="2" size="large" className={style.enHeader}>
                    {'In English'}
                </Heading>
                <BodyLong>{'The page you requested cannot be found.'}</BodyLong>
            </div>
        </div>
    );
};
