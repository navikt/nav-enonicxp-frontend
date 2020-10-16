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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(e.target.value);

    return (
        <form onSubmit={onSubmit} className={bem()}>
            <Input
                aria-labelledby={'search-header'}
                className={bem('input')}
                onChange={onChange}
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
