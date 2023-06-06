import React, { useEffect, useState } from 'react';
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

    const [searchFunc, setSearchFunc] =
        useState<(text: string) => FormDetailsListItemProps[]>();
    const [scoredList, setScoredList] =
        useState<FormDetailsListItemProps[]>(formDetailsList);

    const isVisible = (formDetail: FormDetailsListItemProps) => {
        return matchFilters(formDetail);
    };

    useEffect(() => {
        if (searchFunc) {
            setScoredList(searchFunc(textFilter));
        }
    }, [textFilter, searchFunc]);

    useEffect(() => {
        getFuseSearchFunc(formDetailsList, {
            keys: [
                'formDetailsTitles',
                'formNumbers',
                'title',
                { name: 'sortTitle', weight: 10 },
                { name: 'ingress', weight: 0.5 },
            ],
        }).then((fuseSearchFunc) => setSearchFunc(fuseSearchFunc));
    }, [formDetailsList]);

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
                    numMatches={scoredList.filter(isVisible).length}
                    numTotal={formDetailsList.length}
                    showResetChips={numFilterTypes > 1}
                />
            )}
            {scoredList.map((formDetail) => (
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
