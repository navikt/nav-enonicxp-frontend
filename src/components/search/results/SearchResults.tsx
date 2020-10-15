import React from 'react';
import { Ingress } from 'nav-frontend-typografi';
import { SearchHit } from './SearchHit';
import { SearchHitProps } from '../../../types/search/search-result';
import { BEM } from '../../../utils/bem';

type Props = {
    hits: SearchHitProps[];
    prioritizedHits: SearchHitProps[];
};

export const SearchResults = ({ hits, prioritizedHits }: Props) => {
    const bem = BEM('search-results');

    return (
        <div className={bem('results-list')}>
            <Ingress className={bem('results-list-subheading')}>
                {'Anbefalte treff:'}
            </Ingress>
            {prioritizedHits?.map((hitProps, index) => (
                <SearchHit {...hitProps} key={index} />
            ))}
            <Ingress className={bem('results-list-subheading')}>
                {'Andre treff:'}
            </Ingress>
            {hits?.map((hitProps, index) => (
                <SearchHit {...hitProps} key={index} />
            ))}
        </div>
    );
};
