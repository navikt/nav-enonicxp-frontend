import React, { useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import { BEM } from '../../../utils/bem';
import { Hovedknapp } from 'nav-frontend-knapper';
import './SearchInput.less';

type Props = {
    setSearchTerm: (term: string) => void;
    prevSearchTerm: string;
};

export const SearchInput = ({ setSearchTerm, prevSearchTerm }: Props) => {
    const bem = BEM('search-input');
    const [searchInput, setSearchInput] = useState(prevSearchTerm);

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
                defaultValue={prevSearchTerm}
                placeholder={'Søk på nav.no'}
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
