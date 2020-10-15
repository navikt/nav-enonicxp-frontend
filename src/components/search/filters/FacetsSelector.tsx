import React, { useState } from 'react';
import {
    FacetBucketProps,
    SearchResultProps,
} from '../../../types/search/search-result';
import { SearchParams } from '../../../types/search/search-params';
import { Undertekst } from 'nav-frontend-typografi';
import { Radio } from 'nav-frontend-skjema';
import { FilterPanel } from './filter-panel/FilterPanel';
import { FilterOption } from './filter-panel/FilterOption';
import { BEM } from '../../../utils/bem';
import { ExpandingRadioPanel } from './expanding-radio-panel/ExpandingRadioPanel';
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

    const header = (
        <div className={bem('header')}>
            <Radio
                name={'search-facet'}
                label={facetKey}
                defaultChecked={isOpen}
            />
            <Undertekst className={bem('count')}>{count}</Undertekst>
        </div>
    );

    return (
        <div className={bem()}>
            <ExpandingRadioPanel
                title={header}
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
            </ExpandingRadioPanel>
        </div>
    );
};

export const FacetsSelector = ({ facets, setFacet, setUnderFacet }: Props) => {
    const { buckets } = facets;
    const defaultOpenFacet = buckets.find((facet) => facet.checked);
    const [currentFacet, setCurrentFacet] = useState(defaultOpenFacet.key);

    return (
        <FilterPanel>
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
        </FilterPanel>
    );
};
