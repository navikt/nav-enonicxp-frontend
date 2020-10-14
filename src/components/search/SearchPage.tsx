import React, { useState } from 'react';
import { SearchResultProps } from '../../types/search/search-result';
import { SearchParams } from '../../types/search/search-params';
import { DaterangeSelection } from './DaterangeSelection';
import { SearchResultsHeader } from './results/SearchResultsHeader';
import { BEM } from '../../utils/bem';
import './SearchPage.less';
import { SearchHit } from './results/SearchHit';
import { Ingress } from 'nav-frontend-typografi';

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

    const [searchParams, setSearchParams] = useState<SearchParams>();

    const setDaterange = (daterange) => {
        console.log('Setting daterange: ', daterange);
        setSearchParams((state) => ({ ...state, daterange }));
    };
    const setSort = (s) => {
        console.log('Setting sorting: ', s);
        setSearchParams((state) => ({ ...state, s }));
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
                    {prioritized?.map((hitProps) => (
                        <SearchHit {...hitProps} />
                    ))}
                    <Separator />
                    <Ingress className={bem('results-list-subheading')}>
                        {'Andre treff:'}
                    </Ingress>
                    {hits?.map((hitProps) => (
                        <SearchHit {...hitProps} />
                    ))}
                </div>
            </div>
            <div className={bem('filters')}>
                <DaterangeSelection
                    daterangeProps={aggregations.Tidsperiode}
                    setDaterange={setDaterange}
                />
            </div>
        </div>
    );
};

export default SearchPage;
