import React, { useState } from 'react';
import {
    FormDetailsListItem,
    FormsOverviewProps,
} from 'types/content-props/forms-overview';
import { FormDetailsPanel } from 'components/pages/forms-overview-page/forms-list/FormDetailsItem';
import { FormsOverviewFilters } from 'components/pages/forms-overview-page/filters/FormsOverviewFilters';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';
import { BodyShort } from '@navikt/ds-react';

import style from './FormsOverviewList.module.scss';

export const FormsOverviewList = (props: FormsOverviewProps) => {
    const { formDetailsList, showFilter } = props.data;

    const [areaFilter, setAreaFilter] = useState<Area>(Area.ALL);
    const [taxonomyFilter, setTaxonomyFilter] = useState<ProductTaxonomy>(
        ProductTaxonomy.ALL
    );
    const [searchString, setSearchString] = useState<string>('');

    const isVisiblePredicate = (formDetailsItem: FormDetailsListItem) => {
        const isAreaMatching =
            areaFilter === Area.ALL ||
            formDetailsItem.area.includes(areaFilter);
        if (!isAreaMatching) {
            return false;
        }

        const isTaxonomyMatching =
            taxonomyFilter === ProductTaxonomy.ALL ||
            formDetailsItem.taxonomy.includes(taxonomyFilter);
        if (!isTaxonomyMatching) {
            return false;
        }

        const isSearchMatching =
            !searchString ||
            formDetailsItem.title
                .toLowerCase()
                .includes(searchString.toLowerCase());

        return isSearchMatching;
    };

    const numMatchingFilters =
        formDetailsList.filter(isVisiblePredicate).length;

    return (
        <div>
            <FormsOverviewFilters
                contentList={formDetailsList}
                showAreaFilter={true}
                showTaxonomyFilter={true}
                showTextInputFilter={showFilter}
                setTaxonomyFilter={setTaxonomyFilter}
                setAreaFilter={setAreaFilter}
                setTextInputFilter={setSearchString}
            />
            <BodyShort className={style.filterSummary}>
                {`Viser ${numMatchingFilters} av ${formDetailsList.length}`}
            </BodyShort>
            {formDetailsList.map((formDetail) => (
                <FormDetailsPanel
                    formDetails={formDetail}
                    visible={isVisiblePredicate(formDetail)}
                    key={formDetail.anchorId}
                />
            ))}
        </div>
    );
};
