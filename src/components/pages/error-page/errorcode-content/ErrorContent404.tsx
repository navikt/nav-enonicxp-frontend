import React from 'react';
import { Heading, BodyLong } from '@navikt/ds-react';
import { BEM } from '../../../../utils/classnames';
import { SearchForm } from './search-form/SearchForm';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';
import './ErrorContent404.less';

const origin = process.env.APP_ORIGIN;
const frontpageHref = origin;
const feedbackHref = `${origin}/person/kontakt-oss/tilbakemeldinger/feil-og-mangler`;

export const ErrorContent404 = () => {
    const bem = BEM('error404');

    return (
        <div className={bem()}>
            <div className={bem('content')}>
                <BodyLong>
                    {
                        'Beklager, siden kan være slettet eller flyttet, eller det var en feil i lenken som førte deg hit.'
                    }
                </BodyLong>

                <BodyLong>
                    {'Bruk gjerne søket, menyen eller '}
                    <LenkeInline href={frontpageHref}>
                        {'gå til forsiden'}
                    </LenkeInline>
                    {'.'}
                </BodyLong>

                <BodyLong>
                    <LenkeInline href={feedbackHref}>
                        {'Meld gjerne fra om denne lenken'}
                    </LenkeInline>
                </BodyLong>
            </div>

            <SearchForm />

            <div className={bem('content-en')}>
                <Heading level="2" size="large" className={bem('en-header')}>
                    {'In English'}
                </Heading>
                <BodyLong>{'The page you requested cannot be found.'}</BodyLong>
                <BodyLong>
                    {'Go to the '}
                    <LenkeInline href={frontpageHref}>
                        {'front page'}
                    </LenkeInline>
                    {', or use one of the links in the menu.'}
                </BodyLong>
            </div>
        </div>
    );
};
