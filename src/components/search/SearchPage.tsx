import React, { useEffect, useState } from 'react';
import { SearchResultProps } from '../../types/search/search-result';
import { SearchParams } from '../../types/search/search-params';
import { DaterangeSelector } from './filters/DaterangeSelector';
import { SearchHeader } from './header/SearchHeader';
import { BEM } from '../../utils/bem';
import { Undertittel } from 'nav-frontend-typografi';
import { FacetsSelector } from './filters/FacetsSelector';
import { SearchInput } from './input/SearchInput';
import { SearchSorting } from './sorting/SearchSorting';
import { SearchResults } from './results/SearchResults';
import { objectToQueryString } from '../../utils/fetch-utils';
import './SearchPage.less';
import { SearchApiResponse } from '../../pages/api/search';

const Separator = () => <hr className={'search-separator'} />;

const SearchPage = (props: SearchResultProps) => {
    const bem = BEM('search');

    const [searchResults, setSearchResults] = useState<SearchResultProps>(
        props
    );

    const {
        fasett,
        word,
        total,
        isSortDate,
        aggregations,
        prioritized,
        hits,
    } = searchResults;

    const initialParams: SearchParams = {
        // ord: word,
        c: Number(props.c),
        s: Number(props.s),
    };

    const [searchParams, setSearchParams] = useState<SearchParams>(
        initialParams
    );

    const setSearchTerm = (term: string) =>
        setSearchParams((state) => ({ ...state, ord: term }));

    const setDaterange = (daterange: number) =>
        setSearchParams((state) => ({ ...state, daterange }));

    const setSort = (s: number) =>
        setSearchParams((state) => ({ ...state, s }));

    const setFacet = (f: number) =>
        setSearchParams((state) => ({ ...state, f, uf: [] }));

    const setUnderFacet = ({
        underFacet,
        toggle,
    }: {
        underFacet: number;
        toggle: boolean;
    }) => {
        setSearchParams((state) => {
            const oldUf = state.uf || [];
            const newUf = toggle
                ? oldUf.includes(underFacet)
                    ? oldUf
                    : [...oldUf, underFacet]
                : oldUf.filter((item) => item !== underFacet);
            return { ...state, uf: newUf };
        });
    };

    useEffect(() => {
        const fetchNewResults = async () => {
            const { result, error } = (await fetch(
                `/api/search${objectToQueryString(searchParams)}`
            ).then((res) => res.json())) as SearchApiResponse;

            if (result) {
                console.log(result);
                setSearchResults(result);
            }
            if (error) {
                console.log(error);
            }
        };

        if (searchParams !== initialParams) {
            console.log('search params updated: ', searchParams);
            fetchNewResults();
        }
    }, [searchParams]);

    return (
        <div className={bem()}>
            <div className={bem('results')}>
                <SearchHeader
                    facet={fasett}
                    searchTerm={word}
                    numHits={total}
                />
                <SearchInput setSearchTerm={setSearchTerm} />
                <SearchSorting isSortDate={isSortDate} setSort={setSort} />
                <Separator />
                <SearchResults hits={hits} prioritizedHits={prioritized} />
            </div>
            <div className={bem('filters')}>
                <Undertittel>{'Søkefilter'}</Undertittel>
                <FacetsSelector
                    facets={aggregations.fasetter}
                    setFacet={setFacet}
                    setUnderFacet={setUnderFacet}
                />
                <DaterangeSelector
                    daterangeProps={aggregations.Tidsperiode}
                    setDaterange={setDaterange}
                />
            </div>
        </div>
    );
};

export default SearchPage;
