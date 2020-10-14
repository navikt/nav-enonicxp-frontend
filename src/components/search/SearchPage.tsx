import React, { useState } from 'react';
import { SearchResult } from '../../types/search/search-result';
import { SearchParams } from '../../types/search/search-params';
import { DaterangeSelection } from './DaterangeSelection';
import './SearchPage.less';

const SearchPage = (props: SearchResult) => {
    const [searchParams, setSearchParams] = useState<SearchParams>();
    const setDaterange = (daterange) => {
        console.log('Setting daterange: ', daterange);
        setSearchParams((state) => ({ ...state, daterange }));
    };

    return (
        <DaterangeSelection
            daterangeProps={props.aggregations.Tidsperiode}
            setDaterange={setDaterange}
        />
    );
};

export default SearchPage;
