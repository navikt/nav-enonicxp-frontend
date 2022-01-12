import React, { useState } from 'react';
import { Heading, TextField } from '@navikt/ds-react';
import { ClearIcon } from '../clear-icon/ClearIcon';
import { BEM } from '../../../../../utils/classnames';
import { Button } from '../../../../_common/button/Button';

const origin = process.env.APP_ORIGIN;
const maxSearchLength = 200;

// Replace the localhost port number to support local integration with the search-app
const searchHref = `${origin.replace('3000', '3001')}/sok`;

const label = 'Hva leter du etter?';

export const SearchForm = () => {
    const bem = BEM('search');
    const [searchTerm, setSearchTerm] = useState('');

    const onSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.assign(`${searchHref}?ord=${searchTerm}`);
    };

    return (
        <div className={bem()}>
            <Heading
                level="2"
                size="large"
                className={bem('header')}
                id={'search-header'}
            >
                {label}
            </Heading>

            <form onSubmit={onSearchSubmit} className={bem('form')}>
                <TextField
                    aria-labelledby={'search-header'}
                    className={bem('input')}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    maxLength={maxSearchLength}
                    placeholder={'Søk på nav.no'}
                    value={searchTerm}
                    id={'search-input'}
                    label={label}
                    hideLabel={true}
                />
                <div className={bem('buttons-container')}>
                    {searchTerm && (
                        <Button
                            type={'flat'}
                            className={bem('button')}
                            mini={true}
                            aria-label={'Nullstill søk'}
                            onClick={(e) => {
                                e.preventDefault();
                                setSearchTerm('');
                            }}
                        >
                            <ClearIcon />
                        </Button>
                    )}
                    <Button
                        className={bem('button')}
                        type={'hoved'}
                        onClick={onSearchSubmit}
                    >
                        {'Søk'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
