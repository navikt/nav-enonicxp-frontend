import React from 'react';
import { Ingress, Undertittel } from 'nav-frontend-typografi';
import { SearchHit } from './SearchHit';
import {
    FacetBucketProps,
    SearchHitProps,
    SearchResultProps,
} from '../../../types/search/search-result';
import { BEM } from '../../../utils/bem';
import { Flatknapp } from 'nav-frontend-knapper';
import './SearchResults.less';

type Props = {
    results: SearchResultProps;
    showMore: () => void;
};

const filterHitsBySelectedUnderFacets = (
    hits: SearchHitProps[],
    underFacetBuckets: FacetBucketProps[]
) => {
    const ufSelected = underFacetBuckets?.filter((bucket) => bucket.checked);

    const ufClasses = (ufSelected?.length > 0
        ? ufSelected
        : underFacetBuckets
    ).map((uf) => uf.key.toLowerCase());

    return hits.filter((hit) =>
        ufClasses?.includes(hit.className.toLowerCase().trim())
    );
};

export const SearchResults = ({ results, showMore }: Props) => {
    const bem = BEM('search-results');
    const { hits, prioritized, fasett, aggregations, isMore } = results;

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
            {isMore && (
                <Flatknapp onClick={showMore} className={bem('show-more')}>
                    <Undertittel>{'Vis flere treff'}</Undertittel>
                </Flatknapp>
            )}
        </div>
    );
};
