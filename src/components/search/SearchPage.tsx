import React, { useState } from 'react';
import { SearchResultProps } from '../../types/search/search-result';
import { SearchParams } from '../../types/search/search-params';
import { DaterangeSelector } from './filters/DaterangeSelector';
import { SearchResultsHeader } from './results/SearchResultsHeader';
import { BEM } from '../../utils/bem';
import { SearchHit } from './results/SearchHit';
import { Ingress, Undertittel } from 'nav-frontend-typografi';
import { FacetsSelector } from './filters/FacetsSelector';
import './SearchPage.less';
import Panel from 'nav-frontend-paneler';

const Separator = () => <hr className={'search-separator'} />;

const SearchPage = (props: SearchResultProps) => {
    const bem = BEM('search');
    const {
        fasett,
        word,
        total,
        isSortDate,
        aggregations,
        prioritized,
        hits,
    } = props;

    const prevParams: SearchParams = {
        ord: word,
        c: props.c,
        s: props.s,
    };

    const [searchParams, setSearchParams] = useState<SearchParams>(prevParams);

    const setDaterange = (daterange) => {
        console.log('Setting daterange: ', daterange);
        setSearchParams((state) => ({ ...state, daterange }));
    };

    const setSort = (s) => {
        console.log('Setting sorting: ', s);
        setSearchParams((state) => ({ ...state, s }));
    };

    const setFacet = (f) => {
        console.log('Setting facet: ', f);
        setSearchParams((state) => ({ ...state, f }));
    };

    const setUnderFacets = (uf) => {
        console.log('Setting sub-facets: ', uf);
        setSearchParams((state) => ({ ...state, uf }));
    };

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
                    setUnderFacets={setUnderFacets}
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
