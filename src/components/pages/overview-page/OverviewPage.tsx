import React, { useState } from 'react';
import { Accordion } from '@navikt/ds-react';
import { translator } from 'translations';

import { Area } from 'types/areas';
import { OverviewPageProps } from 'types/content-props/dynamic-page-props';
import ErrorPage404 from 'pages/404';

import { usePageConfig } from 'store/hooks/usePageConfig';
import { fetchRelevantProductDetails } from 'utils/fetch/fetch-product-details';

import { ComponentMapper } from 'components/ComponentMapper';
import { ExpandableProductDetails } from 'components/_common/expandableProductDetails/expandableProductDetails';
import { IllustrationStatic } from 'components/_common/illustration/IllustrationStatic';
import { OverviewFilter } from 'components/_common/overviewFilter/OverviewFilter';
import { scrapeProductPageForProductDetails } from './overviewPageHelpers';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';

import style from './OverviewPage.module.scss';

export const OverviewPage = (props: OverviewPageProps) => {
    const { productList, overviewType } = props.data;
    const { language, pageConfig } = usePageConfig();
    const { isPagePreview, editorView } = pageConfig;

    // Misc translations
    const getTranslationString = translator('overview', language);

    const [areaFilter, setAreaFilter] = useState<Area>(Area.ALL);
    const [openPanels, setOpenPanels] = useState<string[]>([]);
    const [details, setDetails] = useState<any>({});

    // Note: Next 3 lines to be removed when page is ready to go live.
    if (!(isPagePreview || editorView)) {
        return <ErrorPage404 />;
    }

    const fetchPanelContent = async (path: string) => {
        // Don't check if we already have the content.
        if (details[path]) {
            return;
        }

        const cleanedPath = path[0] === '/' ? path.substring(1) : path;

        const fullProductPage = await fetchRelevantProductDetails(cleanedPath);

        const productDetails = scrapeProductPageForProductDetails(
            fullProductPage,
            overviewType
        );

        setDetails({ ...details, [path]: productDetails });
    };

    const handlePanelToggle = (path: string) => {
        const isOpening = openPanels.findIndex((id) => id === path) === -1;
        const updatedOpenPanels = isOpening
            ? [...openPanels, path]
            : openPanels.filter((id) => id !== path);

        setOpenPanels(updatedOpenPanels);

        if (isOpening) {
            fetchPanelContent(path);
        }
    };

    const getDetailComponents = (path: string) => {
        return details[path];
    };

    const handleFilterUpdate = (area: Area) => {
        setAreaFilter(area);
    };

    const filteredProducts = productList.filter((product) => {
        return product.area == areaFilter || areaFilter === Area.ALL;
    });

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
                    {filteredProducts.length === 0 && (
                        <div>{getTranslationString('noProducts')}</div>
                    )}
                    {filteredProducts.map((product) => {
                        const detailComponents = getDetailComponents(
                            product.path
                        );
                        return (
                            <Accordion key={product.path}>
                                <Accordion.Item
                                    open={openPanels.includes(product.path)}
                                    className={style.accordionItem}
                                >
                                    <Accordion.Header
                                        onClick={() =>
                                            handlePanelToggle(product.path)
                                        }
                                    >
                                        <IllustrationStatic
                                            className={style.illustration}
                                            illustration={product.illustration}
                                        />
                                        {product.title}
                                    </Accordion.Header>
                                    <Accordion.Content>
                                        <ExpandableProductDetails
                                            productDetails={product}
                                            detailComponents={detailComponents}
                                            pageProps={props}
                                        />
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
