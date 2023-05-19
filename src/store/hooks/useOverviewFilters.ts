import { useAppDispatch, useAppSelector } from '../store';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';
import { overviewFiltersInitialState } from 'store/slices/overviewFilters';
import { ContentType } from 'types/content-props/_content-common';

export type OverviewFilterableContent = {
    area: Area[];
    taxonomy: ProductTaxonomy[];
    text?: string;
    type?: ContentType;
};

export const useOverviewFiltersState = () => {
    const dispatch = useAppDispatch();

    const { textFilter, areaFilter, taxonomyFilter } = useAppSelector(
        (state) => state.overviewFilters
    );

    const hasDefaultFilters =
        textFilter === overviewFiltersInitialState.textFilter &&
        areaFilter === overviewFiltersInitialState.areaFilter &&
        taxonomyFilter === overviewFiltersInitialState.taxonomyFilter;

    const matchFilters = (filterableContent: OverviewFilterableContent) => {
        const isAreaMatching =
            areaFilter === Area.ALL ||
            filterableContent.area.includes(areaFilter);
        if (!isAreaMatching) {
            return false;
        }

        const isTaxonomyMatching =
            taxonomyFilter === ProductTaxonomy.ALL ||
            filterableContent.taxonomy.includes(taxonomyFilter) ||
            (taxonomyFilter === ProductTaxonomy.FORMS &&
                filterableContent.type !== 'no.nav.navno:guide-page');
        if (!isTaxonomyMatching) {
            return false;
        }

        const isSearchMatching =
            !textFilter ||
            filterableContent.text
                .toLowerCase()
                .includes(textFilter.toLowerCase());

        return isSearchMatching;
    };

    return {
        hasDefaultFilters,
        matchFilters,
        dispatch,
        areaFilter,
        taxonomyFilter,
        textFilter,
    };
};
