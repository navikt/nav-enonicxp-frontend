import React, { useState } from 'react';
import { Heading, TextField } from '@navikt/ds-react';
import { ClearIcon } from 'components/pages/error-page/errorcode-content/clear-icon/ClearIcon';
import { Button } from 'components/_common/button/Button';

import style from './SearchForm.module.scss';

const MAX_SEARCH_LENGTH = 200;
const HEADER_TEXT = 'Hva leter du etter?';

// Replace the localhost port number to support local integration with the search-app
const searchHref = `${process.env.APP_ORIGIN.replace('3000', '3001')}/sok`;

export const SearchForm = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const onSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.assign(`${searchHref}?ord=${searchTerm}`);
    };

    return (
        <div className={style.search}>
            <Heading
                level="2"
                size="large"
                className={style.header}
                id={'search-header'}
            >
                {HEADER_TEXT}
            </Heading>
            <form onSubmit={onSearchSubmit} className={style.form}>
                <TextField
                    aria-labelledby={'search-header'}
                    className={style.input}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    maxLength={MAX_SEARCH_LENGTH}
                    placeholder={'Søk på nav.no'}
                    value={searchTerm}
                    id={'search-input'}
                    label={HEADER_TEXT}
                    hideLabel={true}
                    autoComplete={'off'}
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
