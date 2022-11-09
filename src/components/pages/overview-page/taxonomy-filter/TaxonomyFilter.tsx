import React, { useState } from 'react';
import classNames from 'classnames';
import { Heading, Tag } from '@navikt/ds-react';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { SimplifiedProductData } from 'types/component-props/_mixins';
import { ProductTaxonomy } from 'types/taxonomies';

import styles from './TaxonomyFilter.module.scss';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';

interface TaxonomyFilerProps {
    filterUpdateCallback: (filters: ProductTaxonomy) => void;
    productList: SimplifiedProductData[];
}

export const TaxonomyFilter = ({
    filterUpdateCallback,
    productList,
}: TaxonomyFilerProps) => {
    const [currentFilter, setCurrentFilter] = useState<ProductTaxonomy>(
        ProductTaxonomy.ALL
    );
    const { language } = usePageConfig();

    const productTaxonomies = translator('productTaxonomies', language);
    const overviewTranslations = translator('overview', language);

    const handleFilterUpdate = (taxonomy: ProductTaxonomy) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            type: taxonomy,
            opprinnelse: 'typefilter',
        });
        setCurrentFilter(taxonomy);
        filterUpdateCallback(taxonomy);
    };

    const taxonomiesInProductList = Object.values(ProductTaxonomy).filter(
        (ProductTaxonomy) =>
            productList.some((product) =>
                product.taxonomy.some(
                    (taxonomyItem) => taxonomyItem === ProductTaxonomy
                )
            )
    );

    return (
        <div className={styles.overviewFilter}>
            <Heading size="small" level="2">
                {overviewTranslations('chooseType')}
            </Heading>
            <nav
                role="navigation"
                aria-label={overviewTranslations('ariaExplanation')}
            >
                <ul className={styles.filterWrapper}>
                    {[
                        ProductTaxonomy.ALL,
                        ...taxonomiesInProductList,
                        ProductTaxonomy.FORMS,
                    ].map((taxonomy) => {
                        const isActive = currentFilter === taxonomy;

                        return (
                            <li key={taxonomy}>
                                <button
                                    type="button"
                                    onClick={() => handleFilterUpdate(taxonomy)}
                                    aria-current={isActive}
                                    aria-label={`${overviewTranslations(
                                        'ariaItemExplanation'
                                    )} ${productTaxonomies(taxonomy)}}`}
                                    className={classNames(
                                        styles.filterButton,
                                        isActive && styles.activeButton
                                    )}
                                >
                                    <Tag
                                        variant="info"
                                        className={styles.tag}
                                        size="small"
                                    >
                                        {productTaxonomies(taxonomy)}
                                    </Tag>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
