import React, { useState } from 'react';
import {
    FormDetailsListItem,
    FormsOverviewProps,
} from 'types/content-props/forms-overview';
import { FormDetailsPanel } from 'components/pages/forms-overview-page/forms-list/FormDetailsItem';
import { FormsOverviewFilters } from 'components/pages/forms-overview-page/filters/FormsOverviewFilters';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';

export const FormsOverviewList = (props: FormsOverviewProps) => {
    const { data } = props;
    const { formDetailsList, showFilter } = data;

    const [areaFilter, setAreaFilter] = useState<Area>(Area.ALL);
    const [taxonomyFilter, setTaxonomyFilter] = useState<ProductTaxonomy>(
        ProductTaxonomy.ALL
    );
    const [searchString, setSearchString] = useState<string>('');

    const isVisiblePredicate = (formDetailsItem: FormDetailsListItem) => {
        const isAreaMatching =
            areaFilter === Area.ALL ||
            formDetailsItem.area.some((area) => area === areaFilter);

        const isTaxonomyMatching =
            taxonomyFilter === ProductTaxonomy.ALL ||
            formDetailsItem.taxonomy.includes(taxonomyFilter);

        const isSearchMatching =
            !searchString ||
            formDetailsItem.title
                .toLowerCase()
                .includes(searchString.toLowerCase());

        return isAreaMatching && isSearchMatching && isTaxonomyMatching;
    };

    return (
        <div>
            <FormsOverviewFilters
                setTaxonomyFilter={setTaxonomyFilter}
                setAreaFilter={setAreaFilter}
                setTextInputFilter={setSearchString}
                contentList={formDetailsList}
                showAreaFilter={true}
                showTaxonomyFilter={true}
                showTextInputFilter={showFilter}
            />
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
