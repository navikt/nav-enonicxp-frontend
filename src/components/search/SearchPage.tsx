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
import { useRouter } from 'next/router';
import { fetchSearchResultsClientSide } from '../../utils/fetchSearchResults';
import debounce from 'lodash.debounce';
import './SearchPage.less';

const SearchPage = (props: SearchResultProps) => {
    const bem = BEM('search');
    const router = useRouter();

    const [searchResults, setSearchResults] = useState<SearchResultProps>(
        props
    );
    const [isAwaiting, setIsAwaiting] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const { fasett, word, total, isSortDate, aggregations } = searchResults;

    const initialParams: SearchParams = {
        ord: word || '',
        c: Number(props.c) || 1,
        s: Number(props.s) || 0,
        f:
            aggregations.fasetter.buckets.findIndex(
                (bucket) => bucket.key === fasett
            ) || 0,
    };

    const [searchParams, setSearchParams] = useState<SearchParams>(
        initialParams
    );

    const setSearchTerm = (term: string) =>
        setSearchParams((state) => ({ ...state, ord: term?.trim(), c: 1 }));

    const setDaterange = (daterange: number) =>
        setSearchParams((state) => ({ ...state, daterange, c: 1 }));

    const setSort = (s: number) =>
        setSearchParams((state) => ({ ...state, s, c: 1 }));

    const setFacet = (f: number) =>
        setSearchParams((state) => ({ ...state, f, uf: undefined, c: 1 }));

    const setUnderFacet = ({
        underFacet,
        toggle,
    }: {
        underFacet: string;
        toggle: boolean;
    }) => {
        setSearchParams((state) => {
            const oldUf = state.uf || [];
            const newUf = toggle
                ? oldUf.includes(underFacet)
                    ? oldUf
                    : [...oldUf, underFacet]
                : oldUf.filter((item) => item !== underFacet);
            return { ...state, uf: newUf.length > 0 ? newUf : undefined, c: 1 };
        });
    };

    const fetchAndSetNewResults = debounce(async () => {
        setIsAwaiting(true);
        const { result, error } = await fetchSearchResultsClientSide(
            searchParams,
            router
        );
        setIsAwaiting(false);

        if (result) {
            setSearchResults(result);
        }

        if (error) {
            console.error(`failed to fetch results: ${error}`);
        }
    }, 100);

    useEffect(() => {
        if (isLoaded) {
            fetchAndSetNewResults();
        }
    }, [
        searchParams.daterange,
        searchParams.f,
        searchParams.uf,
        searchParams.s,
    ]);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className={bem()}>
            <div className={bem('search-col')}>
                <div className={bem('search-top-row')}>
                    <SearchHeader facet={fasett} />
                    <SearchInput
                        prevSearchTerm={word}
                        setSearchTerm={setSearchTerm}
                        fetchNewResults={fetchAndSetNewResults}
                    />
                    <SearchSorting
                        isSortDate={isSortDate}
                        setSort={setSort}
                        searchTerm={word}
                        numHits={Number(total)}
                    />
                    <hr className={bem('separator')} />
                </div>
                <SearchResults
                    results={searchResults}
                    isAwaiting={isAwaiting}
                    searchParams={searchParams}
                    setSearchResults={setSearchResults}
                />
            </div>
            <div className={bem('filters-col')}>
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
