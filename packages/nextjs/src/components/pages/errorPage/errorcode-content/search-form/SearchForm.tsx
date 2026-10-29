import React from 'react';
import { Search } from '@navikt/ds-react';

import style from './SearchForm.module.scss';

export const SearchForm = () => {
    return (
        <div className={style.search}>
            <form role="search" action={process.env.SEARCH_URL} method="get" className={style.form}>
                <Search
                    name="ord"
                    label="Du kan søke:"
                    maxLength={100}
                    variant="primary"
                    hideLabel={false}
                    autoComplete="off"
                />
            </form>
        </div>
    );
};
