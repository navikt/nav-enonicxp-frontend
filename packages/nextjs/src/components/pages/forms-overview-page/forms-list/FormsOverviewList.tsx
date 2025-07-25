import React, { useEffect, useState } from 'react';
import { FormsOverviewProps } from 'types/content-props/forms-overview';
import { FormsOverviewListPanel } from 'components/pages/forms-overview-page/forms-list/panel/FormsOverviewListPanel';
import { OverviewFilters } from 'components/_common/overview-filters/OverviewFilters';
import { useOverviewFilters } from 'store/hooks/useOverviewFilters';
import { OverviewFiltersSummary } from 'components/_common/overview-filters/summary/OverviewFiltersSummary';

import style from './FormsOverviewList.module.scss';

// Matches on form number-like queries and returns the full valid form number if match found
// Form numbers are formatted like "NAV 01-23.45"
const getExactFormNumberIfFormSearch = (term: string) => {
    const match = /^(nav.?)?(\d{2}).?(\d{2}).?(\d{2})$/.exec(term);
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

    const [filteredList, setFilteredList] = useState(formDetailsList);

    const { textFilter, getFilteredList } = useOverviewFilters();

    const formNumberFromSearch = getExactFormNumberIfFormSearch(textFilter);

    const numFilterTypes = [areasFilterToggle, taxonomyFilterToggle, textFilterToggle].filter(
        Boolean
    ).length;

    useEffect(() => {
        getFilteredList({
            filterableItems: formDetailsList,
            // If the text filter input was formatted like a form number
            // we only want to search for this exact form number
            textFilterOverride: formNumberFromSearch,
            fuseOptions: formNumberFromSearch
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
                  },
        }).then((result) => {
            setFilteredList(result);
        });
    }, [getFilteredList, formDetailsList, formNumberFromSearch]);

    return (
        <>
            <OverviewFilters
                filterableItems={formDetailsList}
                showTaxonomyFilter={taxonomyFilterToggle}
                showAreaFilter={areasFilterToggle}
                showTextInputFilter={textFilterToggle}
            />
            {numFilterTypes > 0 && (
                <OverviewFiltersSummary
                    numMatches={filteredList.length}
                    numTotal={formDetailsList.length}
                    showResetChips={numFilterTypes > 1}
                />
            )}
            <ul className={style.list}>
                {filteredList.map((formDetail) => (
                    <li key={`${formDetail.anchorId}-${props.language}`}>
                        <FormsOverviewListPanel
                            formDetails={formDetail}
                            overviewType={overviewType}
                            formNumberSelected={formNumberFromSearch}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};
