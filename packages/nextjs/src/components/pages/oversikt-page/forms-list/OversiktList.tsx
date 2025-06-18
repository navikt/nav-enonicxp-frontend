import React, { useEffect, useState } from 'react';
import { OverviewFilters } from 'components/_common/overview-filters/OverviewFilters';
import { useOversiktFilters } from 'store/hooks/useOversiktFilters';
import { OverviewFiltersSummary } from 'components/_common/overview-filters/summary/OverviewFiltersSummary';
import { OversiktPageProps } from 'types/content-props/oversikt-props';
import { OversiktListPanel } from './panel/OversiktListPanel';

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

export const OversiktList = (props: OversiktPageProps) => {
    const { itemList, areasFilterToggle, textFilterToggle, oversiktType } = props.data;

    const [filteredList, setFilteredList] = useState(itemList);
    const { textFilter, getFilteredList } = useOversiktFilters();
    const formNumberFromSearch = getExactFormNumberIfFormSearch(textFilter);
    const numFilterTypes = [areasFilterToggle, textFilterToggle].filter(Boolean).length;

    useEffect(() => {
        getFilteredList({
            filterableItems: itemList,
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
                          { name: 'title', weight: 10 },
                          { name: 'ingress', weight: 8 },
                          { name: 'formDetailsTitles', weight: 2 },
                          { name: 'keywords', weight: 2 },
                          { name: 'formDetailsIngresses', weight: 1 },
                          { name: 'formNumbers', weight: 1 },
                      ],
                  },
        }).then((result) => {
            setFilteredList(result);
        });
    }, [getFilteredList, itemList, formNumberFromSearch]);

    return (
        <>
            <OverviewFilters
                filterableItems={itemList}
                showAreaFilter={areasFilterToggle}
                showTextInputFilter={textFilterToggle}
            />
            {numFilterTypes > 0 && (
                <OverviewFiltersSummary
                    numMatches={filteredList.length}
                    numTotal={itemList.length}
                />
            )}
            <ul className={style.list}>
                {filteredList.map((formDetail) => (
                    <li key={`${formDetail.anchorId}-${props.language}`}>
                        <OversiktListPanel
                            panelDetails={formDetail}
                            oversiktType={oversiktType}
                            formNumberSelected={formNumberFromSearch}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};
