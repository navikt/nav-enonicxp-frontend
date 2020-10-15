import React, { useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import { BEM } from '../../../utils/bem';
import { Hovedknapp } from 'nav-frontend-knapper';
import './SearchInput.less';

type Props = {
    setSearchTerm: (term: string) => void;
};

export const SearchInput = ({ setSearchTerm }: Props) => {
    const bem = BEM('search-input');
    const [searchInput, setSearchInput] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        console.log('submitting');
        e.preventDefault();
        setSearchTerm(searchInput);
    };

    return (
        <form onSubmit={onSubmit} className={bem()}>
            <Input
                aria-labelledby={'search-input-label'}
                className={bem('input')}
                onChange={(e) => setSearchInput(e.target.value)}
                onSubmit={onSubmit}
            />
            <Hovedknapp
                className={bem('button')}
                onClick={onSubmit}
                htmlType={'submit'}
            >
                {'Søk'}
            </Hovedknapp>
        </form>
    );
};
