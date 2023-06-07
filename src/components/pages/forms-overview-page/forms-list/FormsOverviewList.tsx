import React from 'react';
import {
    FormDetailsListItemProps,
    FormsOverviewProps,
} from 'types/content-props/forms-overview';
import { FormsOverviewListPanel } from 'components/pages/forms-overview-page/forms-list/panel/FormsOverviewListPanel';
import { OverviewFilters } from 'components/_common/overview-filters/OverviewFilters';
import { useOverviewFiltersState } from 'store/hooks/useOverviewFilters';
import { OverviewFiltersSummary } from 'components/_common/overview-filters/summary/OverviewFiltersSummary';

import style from './FormsOverviewList.module.scss';

export const FormsOverviewList = (props: FormsOverviewProps) => {
    const {
        formDetailsList,
        areasFilterToggle,
        taxonomyFilterToggle,
        textFilterToggle,
        overviewType,
    } = props.data;

    const { matchFilters } = useOverviewFiltersState();

    const isVisible = (formDetail: FormDetailsListItemProps) => {
        const { ingress, title, sortTitle, formDetailsTitles, formNumbers } =
            formDetail;

        const fieldsToMatch = [
            ...formDetailsTitles,
            ...formNumbers,
            ingress,
            title,
            sortTitle,
        ].map((value) => value?.toLowerCase() || '');

        return matchFilters({
            ...formDetail,
            textMatchFunc: (textFilter) => {
                return fieldsToMatch.some((value) =>
                    value.includes(textFilter)
                );
            },
        });
    };

    const numMatchingFilters = formDetailsList.filter(isVisible).length;

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
            <ul className={style.list}>
                {formDetailsList.map((formDetail) => (
                    <li key={formDetail.anchorId}>
                        <FormsOverviewListPanel
                            formDetails={formDetail}
                            visible={isVisible(formDetail)}
                            overviewType={overviewType}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
