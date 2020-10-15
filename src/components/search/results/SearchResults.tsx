import React from 'react';
import { Ingress } from 'nav-frontend-typografi';
import { SearchHit } from './SearchHit';
import {
    FacetBucketProps,
    SearchHitProps,
    SearchResultProps,
} from '../../../types/search/search-result';
import { BEM } from '../../../utils/bem';
import './SearchResults.less';

type Props = {
    results: SearchResultProps;
    showMore: () => void;
};

const filterHitsBySelectedUnderFacets = (
    hits: SearchHitProps[],
    underFacetBuckets: FacetBucketProps[]
) => {
    const underFacetsSelected = underFacetBuckets?.filter(
        (bucket) => bucket.checked
    );

    const facetClasses = (underFacetsSelected?.length > 0
        ? underFacetsSelected
        : underFacetBuckets
    ).map((uf) => uf.key.toLowerCase());

    return hits.filter((hit) =>
        facetClasses?.includes(hit.className.toLowerCase().trim())
    );
};

export const SearchResults = ({ results, showMore }: Props) => {
    const bem = BEM('search-results');
    const { hits, prioritized, fasett, aggregations } = results;

    const underFacetBuckets = aggregations?.fasetter?.buckets?.find(
        (bucket) => bucket.key === fasett
    )?.underaggregeringer?.buckets;

    const prioritizedHitsToShow = filterHitsBySelectedUnderFacets(
        prioritized,
        underFacetBuckets
    );

    return (
        <div className={bem()}>
            {prioritizedHitsToShow?.length > 0 && (
                <>
                    <Ingress className={bem('subheading')}>
                        {'Anbefalte treff:'}
                    </Ingress>
                    {prioritized?.map((hitProps, index) => (
                        <SearchHit {...hitProps} key={index} />
                    ))}
                </>
            )}
            {hits?.length > 0 && (
                <>
                    {prioritizedHitsToShow?.length > 0 && (
                        <Ingress className={bem('subheading')}>
                            {'Andre treff:'}
                        </Ingress>
                    )}
                    {hits?.map((hitProps, index) => (
                        <SearchHit {...hitProps} key={index} />
                    ))}
                </>
            )}
        </div>
    );
};
