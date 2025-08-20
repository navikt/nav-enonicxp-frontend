import React, { useEffect, useState } from 'react';
import { OversiktFilters } from 'components/_common/oversikt-filters/OversiktFilters';
import { useOversiktFilters } from 'store/hooks/useOversiktFilters';
import { OversiktFiltersSummary } from 'components/_common/oversikt-filters/summary/OversiktFiltersSummary';
import { OversiktPageData, OversiktPageProps } from 'types/content-props/oversikt-props';
import { OversiktListPanel } from './panel/OversiktListPanel';

import style from './OversiktList.module.scss';

// Matches on form number-like queries and returns the full valid form number if match found
// Form numbers are formatted like "NAV 01-23.45" or "NAV 01-23.45b"
const getExactFormNumberIfFormSearch = (term: string) => {
    const match = /^(nav.?)?(\d{2}).?(\d{2}).?(\d{2})$/.exec(term);
    if (!match) {
        return undefined;
    }

    return `nav ${match[2]}-${match[3]}.${match[4]}`;
};

// Weight lets ut adjust fuzzy search results when using Fuse.js
const getWeights = (oversiktType: OversiktPageData['oversiktType']) => {
    // Produktdetaljer
    if (
        oversiktType === 'processing_times' ||
        oversiktType === 'rates' ||
        oversiktType === 'payout_dates'
    ) {
        return [
            { name: 'title', weight: 10 },
            { name: 'ingress', weight: 1 },
            { name: 'itemList.title', weight: 1 },
            { name: 'keywords', weight: 2 },
        ];
    }

    // Skjemadetaljer or "tjeneste fra A til Å"
    return [
        { name: 'title', weight: 10 },
        { name: 'sortTitle', weight: 8 },
        { name: 'ingress', weight: 8 },
        { name: 'subItems.title', weight: 2 },
        { name: 'keywords', weight: 2 },
        { name: 'subItems.ingress', weight: 1 },
        { name: 'subItems.formNumbers', weight: 1 },
    ];
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
                      keys: getWeights(oversiktType),
                  },
        }).then((result) => {
            setFilteredList(result);
        });
    }, [getFilteredList, itemList, formNumberFromSearch, oversiktType]);

    return (
        <>
            <OversiktFilters
                filterableItems={itemList}
                showAreaFilter={areasFilterToggle}
                showTextInputFilter={textFilterToggle}
            />
            {numFilterTypes > 0 && (
                <OversiktFiltersSummary
                    antallTreff={filteredList.length}
                    totaltAntall={itemList.length}
                />
            )}
            <ul className={style.list}>
                {filteredList.map((listItem) => (
                    <li key={`${listItem.anchorId}-${props.language}`}>
                        <OversiktListPanel
                            panelDetails={listItem}
                            oversiktType={oversiktType}
                            skjemanummerValgt={formNumberFromSearch}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};
