import React from 'react';
import {
    FormDetailsListItemProps,
    FormsOverviewProps,
} from 'types/content-props/forms-overview';
import { FormsOverviewListPanel } from 'components/pages/forms-overview-page/forms-list/panel/FormsOverviewListPanel';
import { OverviewFilters } from 'components/_common/overview-filters/OverviewFilters';
import { useOverviewFiltersState } from 'store/hooks/useOverviewFilters';
import { OverviewFiltersSummary } from 'components/_common/overview-filters/summary/OverviewFiltersSummary';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

export const FormsOverviewList = (props: FormsOverviewProps) => {
    const {
        formDetailsList,
        areasFilterToggle,
        taxonomyFilterToggle,
        textFilterToggle,
        overviewType,
    } = props.data;

    const { language } = usePageConfig();

    const { matchFilters } = useOverviewFiltersState();

    const isVisible = (formDetail: FormDetailsListItemProps) => {
        const { area, taxonomy, ingress, title, sortTitle } = formDetail;

        const areaTranslations = translator('areas', language);
        const taxonomyTranslations = translator('taxonomies', language);

        const fieldsToMatch = [
            ...area.map(areaTranslations),
            ...taxonomy.map(taxonomyTranslations),
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

    return (
        <div>
            <OverviewFilters
                filterableItems={formDetailsList}
                showTaxonomyFilter={taxonomyFilterToggle}
                showAreaFilter={areasFilterToggle}
                showTextInputFilter={textFilterToggle}
            />
            <OverviewFiltersSummary
                numMatches={numMatchingFilters}
                numTotal={formDetailsList.length}
            />
            {formDetailsList.map((formDetail) => (
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
