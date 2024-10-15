import React, { useEffect, useState } from 'react';
import { usePageContentProps } from 'store/pageContext';
import { ComponentMapper } from 'components/ComponentMapper';
import { ThemedPageHeader } from 'components/_common/headers/themedPageHeader/ThemedPageHeader';
import { OverviewFilters } from 'components/_common/overview-filters/OverviewFilters';
import { OverviewFiltersSummary } from 'components/_common/overview-filters/summary/OverviewFiltersSummary';
import { OverviewProductDetailsPanel } from 'components/pages/overview-page/product-panel/OverviewProductDetailsPanel';
import { useOverviewFilters } from 'store/hooks/useOverviewFilters';
import { OverviewPageProps } from 'types/content-props/overview-props';

import style from './OverviewPage.module.scss';

export const OverviewPage = (props: OverviewPageProps) => {
    const { productList, overviewType } = props.data;
    const { language } = usePageContentProps();

    const [filteredList, setFilteredList] = useState(productList);

    const { getFilteredList } = useOverviewFilters();

    const isSimpleOverview = overviewType === 'all_products';

    useEffect(() => {
        getFilteredList({
            filterableItems: productList,
            fuseOptions: {
                keys: [
                    { name: 'title', weight: 10 },
                    { name: 'ingress', weight: 1 },
                    { name: 'productLinks.title', weight: 1 },
                    { name: 'keywords', weight: 2 },
                ],
            },
        }).then((result) => {
            setFilteredList(result);
        });
    }, [getFilteredList, productList]);

    return (
        <article className={style.overviewPage}>
            <ThemedPageHeader contentProps={props} showTimeStamp={false} />
            <div className={style.content}>
                <ComponentMapper componentProps={props.page} pageProps={props} />
            </div>
            <div className={style.content}>
                <div className={style.filters}>
                    <OverviewFilters
                        filterableItems={productList}
                        showAreaFilter={true}
                        showTaxonomyFilter={isSimpleOverview}
                        showTextInputFilter={true}
                    />
                    <OverviewFiltersSummary
                        numMatches={filteredList.length}
                        numTotal={productList.length}
                        showResetChips={true}
                    />
                </div>
                <ul className={style.productListWrapper}>
                    {filteredList.map((product) => (
                        <li key={`${product.anchorId}-${language}`}>
                            <OverviewProductDetailsPanel
                                productDetails={product}
                                pageProps={props}
                                detailType={overviewType}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
};
