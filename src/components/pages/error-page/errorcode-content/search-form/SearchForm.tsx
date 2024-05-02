import React, { useState } from 'react';
import { Search } from '@navikt/ds-react';

import style from './SearchForm.module.scss';

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
                    label="Du kan søke:"
                    maxLength={100}
                    variant="primary"
                    hideLabel={false}
                    onChange={(value) => setSearchTerm(value)}
                    autoComplete="off"
                />
            </form>
        </div>
    );
};
