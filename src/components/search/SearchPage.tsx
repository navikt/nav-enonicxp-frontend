import React, { useEffect, useState } from 'react';
import { SearchResultProps } from '../../types/search/search-result';
import { SearchParams } from '../../types/search/search-params';
import { DaterangeSelector } from './filters/DaterangeSelector';
import { SearchResultsHeader } from './results/SearchResultsHeader';
import { BEM } from '../../utils/bem';
import { SearchHit } from './results/SearchHit';
import { Ingress, Undertittel } from 'nav-frontend-typografi';
import { FacetsSelector } from './filters/FacetsSelector';
import './SearchPage.less';
import { fetchSearchResults } from '../../utils/search';

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

    const setDaterange = (daterange) =>
        setSearchParams((state) => ({ ...state, daterange }));

    const setSort = (s) => setSearchParams((state) => ({ ...state, s }));

    const setFacet = (f) =>
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
            const newSearchResults = await fetchSearchResults(
                searchParams
            ).catch((err) => console.log(err));

            if (newSearchResults) {
                console.log(newSearchResults);
                setSearchResults(newSearchResults);
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
                <SearchResultsHeader
                    title={`Søk - ${fasett}`}
                    searchTerm={word}
                    numHits={total}
                    isSortDate={isSortDate}
                    setSort={setSort}
                />
                <Separator />
                <div className={bem('results-list')}>
                    <Ingress className={bem('results-list-subheading')}>
                        {'Anbefalte treff:'}
                    </Ingress>
                    {prioritized?.map((hitProps, index) => (
                        <SearchHit {...hitProps} key={index} />
                    ))}
                    <Separator />
                    <Ingress className={bem('results-list-subheading')}>
                        {'Andre treff:'}
                    </Ingress>
                    {hits?.map((hitProps, index) => (
                        <SearchHit {...hitProps} key={index} />
                    ))}
                </div>
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
