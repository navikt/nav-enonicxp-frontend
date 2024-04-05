import React from 'react';
import { Heading, BodyLong } from '@navikt/ds-react';

import { LenkeInline } from 'components/_common/lenke/LenkeInline';

import { SearchForm } from './search-form/SearchForm';

import style from './ErrorContent404.module.scss';
const origin = process.env.APP_ORIGIN;
const frontpageBase = origin;
const feedbackHref = `${origin}/person/kontakt-oss/tilbakemeldinger/feil-og-mangler`;

export const ErrorContent404 = () => {
    return (
        <div className={style.error404}>
            <div>
                <BodyLong>
                    {
                        'Beklager, siden kan være slettet eller flyttet, eller det var en feil i lenken som førte deg hit.'
                    }
                </BodyLong>
                <BodyLong>
                    {'Bruk gjerne søket, menyen eller '}
                    <LenkeInline href={frontpageBase}>{'gå til forsiden'}</LenkeInline>
                    {'.'}
                </BodyLong>
                <BodyLong>
                    <LenkeInline href={feedbackHref}>
                        {'Meld gjerne fra om denne lenken'}
                    </LenkeInline>
                </BodyLong>
            </div>

            <SearchForm />

            <div className={style.enContent}>
                <Heading level="2" size="large" className={style.enHeader}>
                    {'In English'}
                </Heading>
                <BodyLong>{'The page you requested cannot be found.'}</BodyLong>
                <BodyLong>
                    {'Go to the '}
                    <LenkeInline href={`${frontpageBase}/en`}>{'front page'}</LenkeInline>
                    {', or use one of the links in the menu.'}
                </BodyLong>
            </div>
        </div>
    );
};
