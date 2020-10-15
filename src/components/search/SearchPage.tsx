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
import { SearchApiResponse } from '../../pages/api/search';
import { useRouter } from 'next/router';
import './SearchPage.less';

const Separator = () => <hr className={'search-separator'} />;

const SearchPage = (props: SearchResultProps) => {
    const bem = BEM('search');
    const router = useRouter();

    const [searchResults, setSearchResults] = useState<SearchResultProps>(
        props
    );

    const { fasett, word, total, isSortDate, aggregations } = searchResults;

    const initialParams: SearchParams = {
        ord: word || '',
        c: Number(props.c) || 1,
        s: Number(props.s) || 0,
    };

    const [searchParams, setSearchParams] = useState<SearchParams>(
        initialParams
    );

    const setSearchTerm = (term: string) =>
        setSearchParams((state) => ({ ...state, ord: term, c: 1 }));

    const setDaterange = (daterange: number) =>
        setSearchParams((state) => ({ ...state, daterange, c: 1 }));

    const setSort = (s: number) =>
        setSearchParams((state) => ({ ...state, s, c: 1 }));

    const showMore = () =>
        setSearchParams((state) => ({ ...state, c: state.c + 1 }));

    const setFacet = (f: number) =>
        setSearchParams((state) => ({ ...state, f, uf: [], c: 1 }));

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
            return { ...state, uf: newUf, c: 1 };
        });
    };

    useEffect(() => {
        const fetchNewResults = async () => {
            const queryString = objectToQueryString(searchParams);
            const { result, error } = (await fetch(
                `/api/search${queryString}`
            ).then((res) => res.json())) as SearchApiResponse;

            if (result) {
                setSearchResults(result);
                const newUrl = `${
                    window.location.href.split('?')[0]
                }${queryString}`;
                router.push(newUrl, undefined, {
                    shallow: true,
                });
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
                <SearchResults results={searchResults} showMore={showMore} />
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
