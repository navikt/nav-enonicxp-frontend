import React, { useState } from 'react';
import {
    FacetBucketProps,
    SearchResultProps,
} from '../../../types/search/search-result';
import { SearchParams } from '../../../types/search/search-params';
import { FilterSectionPanel } from './filter-section-panel/FilterSectionPanel';
import { FilterOption } from './filter-section-panel/FilterOption';
import { BEM } from '../../../utils/bem';
import { FilterRadioPanel } from './filter-radio-panel/FilterRadioPanel';
import './FacetsSelector.less';

type Props = {
    facets: SearchResultProps['aggregations']['fasetter'];
    setFacet: (f: SearchParams['f']) => void;
    setUnderFacet: ({
        underFacet,
        toggle,
    }: {
        underFacet: string;
        toggle: boolean;
    }) => void;
};

// Workaround for 'key' being a reserved prop in React
type FacetProps = {
    facetKey: string;
    count: number;
    isOpen: boolean;
    underFacets: FacetBucketProps['underaggregeringer']['buckets'];
    setFacet: Props['setFacet'];
    setUnderFacet: Props['setUnderFacet'];
};

const MainFacet = (props: FacetProps) => {
    const {
        facetKey,
        count,
        isOpen,
        underFacets,
        setFacet,
        setUnderFacet,
    } = props;
    const bem = BEM('search-facet');

    return (
        <div className={bem()}>
            <FilterRadioPanel
                label={facetKey}
                count={count}
                isOpen={isOpen}
                onClick={setFacet}
            >
                {underFacets.length > 0 &&
                    underFacets.map((underFacet, index) => (
                        <FilterOption
                            label={underFacet.key}
                            name={facetKey}
                            count={underFacet.docCount}
                            checked={underFacet.checked}
                            type={'checkbox'}
                            onChange={(e) =>
                                setUnderFacet({
                                    underFacet: String(index),
                                    toggle: e.target.checked,
                                })
                            }
                            key={underFacet.key}
                        />
                    ))}
            </FilterRadioPanel>
        </div>
    );
};

export const FacetsSelector = ({ facets, setFacet, setUnderFacet }: Props) => {
    const { buckets } = facets;
    const defaultOpenFacet = buckets.find((facet) => facet.checked);
    const [currentFacet, setCurrentFacet] = useState(defaultOpenFacet.key);

    return (
        <FilterSectionPanel>
            {buckets.map((facet, index) => (
                <MainFacet
                    facetKey={facet.key}
                    count={facet.docCount}
                    underFacets={facet.underaggregeringer.buckets}
                    isOpen={facet.key === currentFacet}
                    setFacet={() => {
                        setCurrentFacet(facet.key);
                        setFacet(index);
                    }}
                    setUnderFacet={setUnderFacet}
                    key={facet.key}
                />
            ))}
        </FilterSectionPanel>
    );
};
