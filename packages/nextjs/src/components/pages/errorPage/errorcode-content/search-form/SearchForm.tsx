import React from 'react';
import { Search } from '@navikt/ds-react';

import style from './SearchForm.module.scss';

export const SearchForm = () => {
    const searchHref =
        process.env.ENV === 'prod' ? 'https://www.nav.no/sok' : 'https://www.ansatt.dev.nav.no/sok';

    return (
        <div className={style.search}>
            <form role="search" action={searchHref} method="get" className={style.form}>
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
