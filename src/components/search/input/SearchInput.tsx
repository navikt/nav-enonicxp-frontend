import React, { useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import './SearchInput.less';
import { BEM } from '../../../utils/bem';
import { Hovedknapp } from 'nav-frontend-knapper';

type Props = {
    setSearchTerm: (term: string) => void;
};

export const SearchInput = ({ setSearchTerm }: Props) => {
    const bem = BEM('search-input');
    const [searchInput, setSearchInput] = useState('');

    return (
        <div className={bem()}>
            <Input
                aria-labelledby={'search-input-label'}
                className={bem('input')}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <Hovedknapp
                className={bem('button')}
                onClick={() => setSearchTerm(searchInput)}
            >
                {'Søk'}
            </Hovedknapp>
        </div>
    );
};
