import React, { useEffect, useState } from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { fetchUrlSuggestion, UrlSearchResponse } from 'utils/fetch/fetch-url-suggestion';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { SearchForm } from './search-form/SearchForm';

import style from './ErrorContent404.module.scss';
const origin = process.env.APP_ORIGIN;
const feedbackHref = `${origin}/person/kontakt-oss/tilbakemeldinger/feil-og-mangler`;
export const ErrorContent404 = () => {
    const [urlSuggestion, setUrlSuggestion] = useState<UrlSearchResponse>();

    useEffect(() => {
        fetchUrlSuggestion(`${window.location.origin}${window.location.pathname}`).then((res) => {
            res && setUrlSuggestion(res);
        });
    }, []);

    return (
        <div className={style.error404}>
            <div>
                {urlSuggestion && urlSuggestion.url && urlSuggestion.title && (
                    <BodyLong>
                        {'Kanskje du mente denne siden: '}
                        <LenkeInline className={style.urlSuggestion} href={urlSuggestion.url}>
                            {urlSuggestion.title}
                        </LenkeInline>
                    </BodyLong>
                )}

                <SearchForm />

                <BodyLong className="style.SearchForm">
                    {'Meld gjerne fra om '}
                    <LenkeInline href={feedbackHref}>{'feil på lenken'}</LenkeInline>
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
