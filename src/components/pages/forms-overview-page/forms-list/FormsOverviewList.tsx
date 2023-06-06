import React from 'react';
import {
    FormDetailsListItemProps,
    FormsOverviewProps,
} from 'types/content-props/forms-overview';
import { FormsOverviewListPanel } from 'components/pages/forms-overview-page/forms-list/panel/FormsOverviewListPanel';
import { OverviewFilters } from 'components/_common/overview-filters/OverviewFilters';
import { useOverviewFiltersState } from 'store/hooks/useOverviewFilters';
import { OverviewFiltersSummary } from 'components/_common/overview-filters/summary/OverviewFiltersSummary';
import { getFuseSearchFunc } from 'utils/text-search-utils';

export const FormsOverviewList = (props: FormsOverviewProps) => {
    const {
        formDetailsList,
        areasFilterToggle,
        taxonomyFilterToggle,
        textFilterToggle,
        overviewType,
    } = props.data;

    const { matchFilters, textFilter } = useOverviewFiltersState();

    const textSearchFunc = getFuseSearchFunc(formDetailsList, {
        keys: [
            'formDetailsTitles',
            'formNumbers',
            'title',
            { name: 'sortTitle', weight: 10 },
            'ingress',
        ],
    });

    const listSortedBySearchScore = textSearchFunc(textFilter);

    const isVisible = (formDetail: FormDetailsListItemProps) => {
        return matchFilters(formDetail);
    };

    const numMatchingFilters = listSortedBySearchScore.filter(isVisible).length;

    const numFilterTypes = [
        areasFilterToggle,
        taxonomyFilterToggle,
        textFilterToggle,
    ].filter(Boolean).length;

    return (
        <div>
            <OverviewFilters
                filterableItems={formDetailsList}
                showTaxonomyFilter={taxonomyFilterToggle}
                showAreaFilter={areasFilterToggle}
                showTextInputFilter={textFilterToggle}
            />
            {numFilterTypes > 0 && (
                <OverviewFiltersSummary
                    numMatches={numMatchingFilters}
                    numTotal={formDetailsList.length}
                    showResetChips={numFilterTypes > 1}
                />
            )}
            {listSortedBySearchScore.map((formDetail) => (
                <FormsOverviewListPanel
                    formDetails={formDetail}
                    visible={isVisible(formDetail)}
                    overviewType={overviewType}
                    key={formDetail.anchorId}
                />
            ))}
        </div>
    );
};
