import { useState } from 'react';
import classNames from 'classnames';
import { Heading, Tag } from '@navikt/ds-react';

import { Area } from 'types/areas';

import { translator } from '../../../../translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

import styles from './TaxonomyFilter.module.scss';
import { Taxonomy } from 'types/taxonomies';

interface TaxonomyFilerProps {
    filterUpdateCallback: (filters: Taxonomy) => void;
}

export const TaxonomyFilter = ({
    filterUpdateCallback,
}: TaxonomyFilerProps) => {
    const filterableTaxonomies = [
        Taxonomy.ALL,
        Taxonomy.ASSISTIVE_TOOLS,
        Taxonomy.BENEFITS,
        Taxonomy.FOLLOWUP,
        Taxonomy.MEASURES,
        Taxonomy.RIGHTS,
    ];
    const [currentFilter, setCurrentFilter] = useState<Taxonomy>(Taxonomy.ALL);
    const { language } = usePageConfig();

    const productTaxonomies = translator('productTaxonomies', language);
    const overviewTranslations = translator('overview', language);

    const handleFilterUpdate = (taxonomy: Taxonomy) => {
        setCurrentFilter(taxonomy);
        filterUpdateCallback(taxonomy);
    };

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
                    {filterableTaxonomies.map((taxonomy) => {
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
                                        {' '}
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
