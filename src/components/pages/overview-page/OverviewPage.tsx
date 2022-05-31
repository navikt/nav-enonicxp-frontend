import React, { useState } from 'react';
import { translator } from 'translations';
import { Area } from 'types/areas';
import { OverviewPageProps } from 'types/content-props/dynamic-page-props';
import ErrorPage404 from 'pages/404';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { ComponentMapper } from 'components/ComponentMapper';
import { OverviewFilter } from 'components/pages/overview-page/product-filter/OverviewFilter';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';
import { OverviewPageDetailsPanel } from './product-panel/OverviewPageDetailsPanel';
import { SimplifiedProductData } from '../../../types/component-props/_mixins';

import style from './OverviewPage.module.scss';

const isVisiblePredicate = (product: SimplifiedProductData, areaFilter: Area) =>
    areaFilter === Area.ALL || product.area.some((area) => area === areaFilter);

export const OverviewPage = (props: OverviewPageProps) => {
    const { productList, overviewType } = props.data;
    const { language, pageConfig } = usePageConfig();
    const { isPagePreview, editorView } = pageConfig;

    // Misc translations
    const getTranslationString = translator('overview', language);

    const [areaFilter, setAreaFilter] = useState<Area>(Area.ALL);

    const handleFilterUpdate = (area: Area) => {
        setAreaFilter(area);
    };

    const hasVisibleProducts = productList.some((product) =>
        isVisiblePredicate(product, areaFilter)
    );

    return (
        <div className={style.overviewPage}>
            <ThemedPageHeader contentProps={props} showTimeStamp={false} />
            <div className={style.content}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
            <div className={style.content}>
                <OverviewFilter filterUpdateCallback={handleFilterUpdate} />
                <div className={style.productListWrapper}>
                    {!hasVisibleProducts && (
                        <div>{getTranslationString('noProducts')}</div>
                    )}
                    {productList.map((product) => (
                        <OverviewPageDetailsPanel
                            productDetails={product}
                            pageProps={props}
                            visible={isVisiblePredicate(product, areaFilter)}
                            detailType={overviewType}
                            key={product._id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
