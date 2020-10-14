import React, { useState } from 'react';
import {
    FacetBucketProps,
    SearchResultProps,
} from '../../../types/search/search-result';
import { SearchParams } from '../../../types/search/search-params';
import { Element, Undertekst } from 'nav-frontend-typografi';
import { CheckboxGruppe, Radio } from 'nav-frontend-skjema';
import { FilterPanel } from './filter-panel/FilterPanel';
import { FilterOption } from './filter-panel/FilterOption';
import './FacetsSelector.less';
import { BEM } from '../../../utils/bem';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { RadioExpandingPanel } from './radio-expanding-panel/RadioExpandingPanel';

type Props = {
    facets: SearchResultProps['aggregations']['fasetter'];
    setFacet: (f: SearchParams['f']) => void;
    setUnderFacets: (uf: SearchParams['uf']) => void;
};

// Workaround for 'key' being a reserved prop in React
type FacetProps = {
    facetKey: string;
    count: number;
    isOpen: boolean;
    underFacets: FacetBucketProps['underaggregeringer']['buckets'];
    onClick: () => void;
};

const MainFacet = (props: FacetProps) => {
    const { facetKey, count, isOpen, underFacets, onClick } = props;
    const bem = BEM('search-facet');

    const header = (
        <div className={bem('header')}>
            <Radio name={'search-facet'} label={facetKey} checked={isOpen} />
            <Undertekst className={bem('count')}>{count}</Undertekst>
        </div>
    );

    return (
        <div className={bem()}>
            <RadioExpandingPanel
                title={header}
                isOpen={isOpen}
                onClick={onClick}
            >
                <CheckboxGruppe>
                    {underFacets.map((underFacet) => (
                        <FilterOption
                            label={underFacet.key}
                            name={facetKey}
                            count={underFacet.docCount}
                            defaultChecked={underFacet.checked}
                            type={'checkbox'}
                            onChange={() => null}
                            key={underFacet.key}
                        />
                    ))}
                </CheckboxGruppe>
            </RadioExpandingPanel>
        </div>
    );
};

export const FacetsSelector = ({ facets, setFacet, setUnderFacets }: Props) => {
    const { buckets } = facets;
    const defaultOpenFacet = buckets.find((facet) => facet.checked);
    const [currentFacet, setCurrentFacet] = useState(defaultOpenFacet.key);

    return (
        <FilterPanel>
            {buckets.map((props) => (
                <MainFacet
                    facetKey={props.key}
                    count={props.docCount}
                    underFacets={props.underaggregeringer.buckets}
                    isOpen={props.key === currentFacet}
                    onClick={() => setCurrentFacet(props.key)}
                />
            ))}
        </FilterPanel>
    );
};
