import React from 'react';
import { Input } from 'nav-frontend-skjema';
import { BEM } from '../../../utils/bem';
import { Hovedknapp } from 'nav-frontend-knapper';
import './SearchInput.less';

type Props = {
    prevSearchTerm: string;
    setSearchTerm: (term: string) => void;
    fetchNewResults: () => void;
};

export const SearchInput = ({
    prevSearchTerm,
    setSearchTerm,
    fetchNewResults,
}: Props) => {
    const bem = BEM('search-input');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchNewResults();
    };

    return (
        <form onSubmit={onSubmit} className={bem()}>
            <Input
                aria-labelledby={'search-header'}
                className={bem('input')}
                onChange={(e) => setSearchTerm(e.target.value)}
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
