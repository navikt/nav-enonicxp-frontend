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

import style from './OverviewPage.module.scss';

export const OverviewPage = (props: OverviewPageProps) => {
    const { productList, overviewType } = props.data;
    const { language, pageConfig } = usePageConfig();
    const { isPagePreview, editorView } = pageConfig;

    // Misc translations
    const getTranslationString = translator('overview', language);

    const [areaFilter, setAreaFilter] = useState<Area>(Area.ALL);

    // Note: Next 3 lines to be removed when page is ready to go live.
    if (!(isPagePreview || editorView || props.serverEnv !== 'prod')) {
        return <ErrorPage404 />;
    }

    const handleFilterUpdate = (area: Area) => {
        setAreaFilter(area);
    };

    const hasVisibleProducts = productList.some(
        (product) => product.area === areaFilter || areaFilter === Area.ALL
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
                            visible={
                                product.area == areaFilter ||
                                areaFilter === Area.ALL
                            }
                            detailType={overviewType}
                            key={product._id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
