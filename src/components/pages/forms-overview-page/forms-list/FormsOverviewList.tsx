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
import type Fuse from 'fuse.js';

import style from './FormsOverviewList.module.scss';

// Matches on form number-like queries and returns the full valid form number if match found
// Form numbers are formatted like "NAV 01-23.45"
const getExactFormNumberIfFormSearch = (term: string) => {
    const match = /^(nav.?)?([0-9]{2}).?([0-9]{2}).?([0-9]{2})$/.exec(term);
    if (!match) {
        return undefined;
    }

    return `nav ${match[2]}-${match[3]}.${match[4]}`;
};

export const FormsOverviewList = (props: FormsOverviewProps) => {
    const {
        formDetailsList,
        areasFilterToggle,
        taxonomyFilterToggle,
        textFilterToggle,
        overviewType,
    } = props.data;

    const { matchFilters, textFilter } = useOverviewFiltersState();

    const formNumberFromSearch = getExactFormNumberIfFormSearch(textFilter);

    const [scoredList, setScoredList] =
        useState<FormDetailsListItemProps[]>(formDetailsList);

    const isVisible = (formDetail: FormDetailsListItemProps) => {
        return matchFilters(formDetail);
    };

    useEffect(() => {
        if (!textFilter) {
            setScoredList(formDetailsList);
            return;
        }

        // Form number search should only return exact matches
        const fuseOptions: Fuse.IFuseOptions<FormDetailsListItemProps> =
            formNumberFromSearch
                ? {
                      keys: ['formNumbers'],
                      threshold: 0,
                  }
                : {
                      keys: [
                          { name: 'sortTitle', weight: 10 },
                          { name: 'formDetailsTitles', weight: 2 },
                          { name: 'keywords', weight: 2 },
                          { name: 'ingress', weight: 1 },
                          { name: 'formDetailsIngresses', weight: 1 },
                          { name: 'title', weight: 1 },
                          { name: 'formNumbers', weight: 1 },
                      ],
                  };

        getFuseSearchFunc(formDetailsList, fuseOptions).then(
            (fuseSearchFunc) => {
                const result = fuseSearchFunc(
                    formNumberFromSearch || textFilter
                );
                setScoredList(result);
            }
        );
    }, [formDetailsList, textFilter]);

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
            <ul className={style.list}>
                {scoredList.map((formDetail) => (
                    <li key={formDetail.anchorId}>
                        <FormsOverviewListPanel
                            formDetails={formDetail}
                            visible={isVisible(formDetail)}
                            overviewType={overviewType}
                            formNumberSelected={formNumberFromSearch}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
