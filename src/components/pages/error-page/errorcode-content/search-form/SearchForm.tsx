import React, { useState } from 'react';
import { Heading, TextField } from '@navikt/ds-react';
import { ClearIcon } from '../clear-icon/ClearIcon';
import { Button } from 'components/_common/button/Button';

import style from './SearchForm.module.scss';

const MAX_INPUT_LENGTH = 200;

// Replace the localhost port number to support local integration with the search-app
const SEARCH_URL = `${process.env.APP_ORIGIN.replace('3000', '3001')}/sok?ord=`;

const LABEL = 'Hva leter du etter?';

export const SearchForm = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const onSearchSubmit = (e: React.FormEvent | React.MouseEvent) => {
        e.preventDefault();
        window.location.assign(`${SEARCH_URL}${searchTerm}`);
    };

    return (
        <div className={style.search}>
            <Heading
                level="2"
                size="large"
                className={style.header}
                id={'search-header'}
            >
                {LABEL}
            </Heading>
            <form onSubmit={onSearchSubmit} className={style.form}>
                <TextField
                    aria-labelledby={'search-header'}
                    className={style.input}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    maxLength={MAX_INPUT_LENGTH}
                    placeholder={'Søk på nav.no'}
                    value={searchTerm}
                    id={'search-input'}
                    label={LABEL}
                    hideLabel={true}
                />
                <div className={style.buttonsContainer}>
                    {searchTerm && (
                        <Button
                            variant={'tertiary'}
                            className={style.button}
                            size={'small'}
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
                        className={style.button}
                        variant={'primary'}
                        onClick={onSearchSubmit}
                    >
                        {'Søk'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
