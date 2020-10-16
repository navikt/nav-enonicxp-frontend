import { Undertekst } from 'nav-frontend-typografi';
import { FacetsSelector } from './facets-selector/FacetsSelector';
import { DaterangeSelector } from './daterange-selector/DaterangeSelector';
import React, { useState } from 'react';
import {
    DaterangeProps,
    FacetBucketProps,
} from '../../../types/search/search-result';
import { BEM } from '../../../utils/bem';
import Lenke from 'nav-frontend-lenker';
import './SearchFilters.less';

export type UFSetterProps = {
    underFacet: string;
    toggle: boolean;
};

type Props = {
    daterangeProps: DaterangeProps;
    facetsProps: FacetBucketProps[];
    setFacet: (f: number) => void;
    setUnderFacet: (props: UFSetterProps) => void;
    setDaterange: (daterange: number) => void;
};

export const SearchFilters = ({
    daterangeProps,
    facetsProps,
    setFacet,
    setUnderFacet,
    setDaterange,
}: Props) => {
    const bem = BEM('search-filters');
    const [visibleMobile, setVisibleMobile] = useState(false);

    return (
        <div className={bem()}>
            <Lenke
                href={''}
                onClick={(e) => {
                    e.preventDefault();
                    setVisibleMobile((state) => !state);
                }}
                className={bem('header')}
            >
                <p className={bem('title')}>{'Søkefilter'}</p>
                <Undertekst className={bem('filter-toggle')}>
                    {visibleMobile ? 'Skjul filter' : 'Vis filter'}
                </Undertekst>
            </Lenke>
            <div
                className={`${bem('filters')} ${
                    visibleMobile ? bem('filters', 'visible-mobile') : undefined
                }`}
            >
                <FacetsSelector
                    facetsProps={facetsProps}
                    setFacet={setFacet}
                    setUnderFacet={setUnderFacet}
                />
                <DaterangeSelector
                    daterangeProps={daterangeProps}
                    setDaterange={setDaterange}
                />
            </div>
        </div>
    );
};
