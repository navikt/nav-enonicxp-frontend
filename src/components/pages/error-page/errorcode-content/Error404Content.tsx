import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { BEM } from '../../../../utils/bem';
import { SearchForm } from './search-form/SearchForm';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';
import './Error404Content.less';

const origin = process.env.APP_ORIGIN;
const frontpageHref = origin;
const feedbackHref = `${origin}/person/kontakt-oss/tilbakemeldinger/feil-og-mangler`;

export const Error404Content = () => {
    const bem = BEM('error404');

    return (
        <div className={bem()}>
            <div className={bem('content')}>
                <Normaltekst>
                    {
                        'Beklager, siden kan være slettet eller flyttet, eller det var en feil i lenken som førte deg hit.'
                    }
                </Normaltekst>

                <Normaltekst>
                    {'Bruk gjerne søket, menyen eller '}
                    <LenkeInline href={frontpageHref}>
                        {'gå til forsiden'}
                    </LenkeInline>
                    {'.'}
                </Normaltekst>

                <Normaltekst>
                    <LenkeInline href={feedbackHref}>
                        {'Meld gjerne fra om denne lenken'}
                    </LenkeInline>
                </Normaltekst>
            </div>

            <SearchForm />

            <div className={bem('content-en')}>
                <Undertittel className={bem('en-header')}>
                    {'In English'}
                </Undertittel>
                <Normaltekst>
                    {'The page you requested cannot be found.'}
                </Normaltekst>
                <Normaltekst>
                    {'Go to the '}
                    <LenkeInline href={frontpageHref}>
                        {'front page'}
                    </LenkeInline>
                    {', or use one of the links in the menu.'}
                </Normaltekst>
            </div>
        </div>
    );
};
