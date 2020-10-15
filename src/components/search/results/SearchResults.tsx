import React, { useState } from 'react';
import { Element, Undertittel } from 'nav-frontend-typografi';
import { SearchHit } from './SearchHit';
import {
    FacetBucketProps,
    SearchHitProps,
    SearchResultProps,
} from '../../../types/search/search-result';
import { BEM } from '../../../utils/bem';
import { Flatknapp } from 'nav-frontend-knapper';
import Spinner from '../../part-components/_common/spinner/Spinner';
import { SearchParams } from '../../../types/search/search-params';
import { fetchSearchResultsClientSide } from '../../../utils/fetchSearchResults';
import { useRouter } from 'next/router';
import './SearchResults.less';

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

type Props = {
    results: SearchResultProps;
    isAwaiting: boolean;
    searchParams: SearchParams;
    setSearchResults: (results: SearchResultProps) => void;
};

export const SearchResults = ({
    results,
    isAwaiting,
    searchParams,
    setSearchResults,
}: Props) => {
    const bem = BEM('search-results');
    const { hits, prioritized, fasett, aggregations, isMore } = results;

    const [chunkCount, setChunkCount] = useState(searchParams.c);
    const [isAwaitingMore, setIsAwaitingMore] = useState(false);
    const router = useRouter();

    const underFacetBuckets = aggregations?.fasetter?.buckets?.find(
        (bucket) => bucket.key === fasett
    )?.underaggregeringer?.buckets;

    const prioritizedHitsToShow = filterHitsBySelectedUnderFacets(
        prioritized,
        underFacetBuckets
    );

    const showMore = async () => {
        setIsAwaitingMore(true);
        const newCount = chunkCount + 1;
        const { result, error } = await fetchSearchResultsClientSide(
            { ...searchParams, c: newCount },
            router
        );
        setChunkCount(newCount);
        setIsAwaitingMore(false);

        if (result) {
            setSearchResults(result);
        }

        if (error) {
            console.error(`failed to fetch more: ${error}`);
        }
    };

    return (
        <div className={bem()}>
            {isAwaiting ? (
                <Spinner text={'Henter søke-resultater...'} />
            ) : (
                <>
                    {' '}
                    {prioritizedHitsToShow?.length > 0 && (
                        <>
                            <Element className={bem('subheading')}>
                                {'Anbefalte treff:'}
                            </Element>
                            {prioritized?.map((hitProps, index) => (
                                <SearchHit {...hitProps} key={index} />
                            ))}
                        </>
                    )}
                    {hits?.length > 0 && (
                        <>
                            {prioritizedHitsToShow?.length > 0 && (
                                <>
                                    <hr className={bem('separator')} />
                                    <Element className={bem('subheading')}>
                                        {'Andre treff:'}
                                    </Element>
                                </>
                            )}
                            {hits?.map((hitProps, index) => (
                                <SearchHit {...hitProps} key={index} />
                            ))}
                        </>
                    )}
                    {isMore && (
                        <Flatknapp
                            onClick={showMore}
                            className={bem('show-more')}
                            spinner={isAwaitingMore}
                            disabled={isAwaitingMore}
                        >
                            <Undertittel>
                                {isAwaitingMore
                                    ? 'Henter flere treff...'
                                    : 'Vis flere treff'}
                            </Undertittel>
                        </Flatknapp>
                    )}
                </>
            )}
        </div>
    );
};
