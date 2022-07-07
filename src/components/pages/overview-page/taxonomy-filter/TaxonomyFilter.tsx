import React, { useState } from 'react';
import classNames from 'classnames';
import { Heading, Tag } from '@navikt/ds-react';
import { translator } from '../../../../translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { SimplifiedProductData } from '../../../../types/component-props/_mixins';
import { Taxonomy } from 'types/taxonomies';

import styles from './TaxonomyFilter.module.scss';

interface TaxonomyFilerProps {
    filterUpdateCallback: (filters: Taxonomy) => void;
    productList: SimplifiedProductData[];
}

export const TaxonomyFilter = ({
    filterUpdateCallback,
    productList,
}: TaxonomyFilerProps) => {
    const [currentFilter, setCurrentFilter] = useState<Taxonomy>(Taxonomy.ALL);
    const { language } = usePageConfig();

    const productTaxonomies = translator('productTaxonomies', language);
    const overviewTranslations = translator('overview', language);

    const handleFilterUpdate = (taxonomy: Taxonomy) => {
        setCurrentFilter(taxonomy);
        filterUpdateCallback(taxonomy);
    };

    const taxonomiesInProductList = Object.values(Taxonomy).filter((taxonomy) =>
        productList.some((product) =>
            product.taxonomy.some((taxonomyItem) => taxonomyItem === taxonomy)
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
                    {[Taxonomy.ALL, ...taxonomiesInProductList].map(
                        (taxonomy) => {
                            const isActive = currentFilter === taxonomy;

                            return (
                                <li key={taxonomy}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleFilterUpdate(taxonomy)
                                        }
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
                        }
                    )}
                </ul>
            </nav>
        </div>
    );
};
