import React from 'react';
import { ProductTaxonomy } from 'types/taxonomies';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OverviewFilterBase } from 'components/_common/overview-filters/filter-base/OverviewFilterBase';
import { ContentType } from 'types/content-props/_content-common';

type Props = {
    contentList: Array<{ taxonomy: ProductTaxonomy[]; type?: ContentType }>;
    taxonomyFilter: ProductTaxonomy;
    setTaxonomyFilter: (taxonomy: ProductTaxonomy) => void;
};

export const OverviewTaxonomyFilter = ({
    contentList,
    taxonomyFilter,
    setTaxonomyFilter,
}: Props) => {
    const handleFilterUpdate = (taxonomy: ProductTaxonomy) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            type: taxonomy,
            opprinnelse: 'oversiktsside typer',
        });
        setTaxonomyFilter(taxonomy);
    };

    const taxonomiesInProductList = Object.values(ProductTaxonomy).filter(
        (ProductTaxonomy) =>
            contentList.some((product) =>
                product.taxonomy.some(
                    (taxonomyItem) => taxonomyItem === ProductTaxonomy
                )
            )
    );

    const productListHasGuidePage = contentList.some(
        (product) => product.type === 'no.nav.navno:guide-page'
    );

    if (productListHasGuidePage) {
        taxonomiesInProductList.push(ProductTaxonomy.FORMS);
    }

    return (
        <OverviewFilterBase
            type={'taxonomies'}
            selectionCallback={handleFilterUpdate}
            selected={taxonomyFilter}
            options={[ProductTaxonomy.ALL, ...taxonomiesInProductList]}
        />
    );
};
