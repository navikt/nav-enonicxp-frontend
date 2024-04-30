import React, { useState } from 'react';
import { Search } from '@navikt/ds-react';

import style from './SearchForm.module.scss';

const HEADER_TEXT = 'Du kan søke:';
const MAX_SEARCH_LENGTH = 100;

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
            <form role="search" onSubmit={onSearchSubmit} className={style.form}>
                <Search
                    label={HEADER_TEXT}
                    maxLength={MAX_SEARCH_LENGTH}
                    variant="primary"
                    hideLabel={false}
                    onChange={(e) => setSearchTerm(e)}
                    autoComplete="off"
                />
            </form>
        </div>
    );
};
