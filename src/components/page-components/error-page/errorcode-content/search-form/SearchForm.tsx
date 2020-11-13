import React, { useState } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { ClearIcon } from '../clear-icon/ClearIcon';
import { Input } from 'nav-frontend-skjema';
import { BEM } from '../../../../../utils/bem';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import './SearchForm.less';

const origin = process.env.APP_ORIGIN;
const maxSearchLength = 200;

// Replace the localhost port number to support local integration with the search-app
const searchHref = `${origin.replace('3000', '3001')}/sok`;

export const SearchForm = () => {
    const bem = BEM('search');
    const [searchTerm, setSearchTerm] = useState('');

    const onSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.assign(`${searchHref}?ord=${searchTerm}`);
    };

    return (
        <div className={bem()}>
            <Undertittel className={bem('header')} id={'search-header'}>
                {'Hva leter du etter?'}
            </Undertittel>

            <form onSubmit={onSearchSubmit} className={bem('form')}>
                <Input
                    aria-labelledby={'search-header'}
                    className={bem('input')}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    maxLength={maxSearchLength}
                    placeholder={'Søk på nav.no'}
                    value={searchTerm}
                    id={'search-input'}
                />
                <div className={bem('buttons-container')}>
                    {searchTerm && (
                        <Flatknapp
                            className={bem('button')}
                            mini={true}
                            aria-label={'Nullstill søk'}
                            onClick={() => setSearchTerm('')}
                            htmlType={'button'}
                        >
                            <ClearIcon />
                        </Flatknapp>
                    )}
                    <Hovedknapp className={bem('button')} htmlType={'submit'}>
                        {'Søk'}
                    </Hovedknapp>
                </div>
            </form>
        </div>
    );
};
