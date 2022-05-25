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
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';
import { scrapeProductPageForProductDetails } from './overviewPageHelpers';

import style from './OverviewPage.module.scss';
import { SimplifiedProductData } from '../../../types/component-props/_mixins';

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
    if (!(isPagePreview || editorView || props.serverEnv !== 'prod')) {
        return <ErrorPage404 />;
    }

    const fetchPanelContent = async (product: SimplifiedProductData) => {
        const { idOrPath, productDetailsPaths } = product;

        // Don't check if we already have the content.
        if (details[idOrPath]) {
            return;
        }

        const productDetails = await fetchRelevantProductDetails(
            productDetailsPaths
        );

        setDetails({ ...details, [idOrPath]: productDetails });
    };

    const handlePanelToggle = (product: SimplifiedProductData) => {
        const { idOrPath } = product;
        const isOpening = openPanels.findIndex((id) => id === idOrPath) === -1;
        const updatedOpenPanels = isOpening
            ? [...openPanels, idOrPath]
            : openPanels.filter((id) => id !== idOrPath);

        setOpenPanels(updatedOpenPanels);

        if (isOpening) {
            fetchPanelContent(product);
        }
    };

    const getDetailComponents = (idOrPath: string) => {
        return details[idOrPath];
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
                            product.idOrPath
                        );

                        return (
                            <Accordion key={product.idOrPath}>
                                <Accordion.Item
                                    open={openPanels.includes(product.idOrPath)}
                                    className={style.accordionItem}
                                >
                                    <Accordion.Header
                                        onClick={() =>
                                            handlePanelToggle(product)
                                        }
                                    >
                                        <IllustrationStatic
                                            className={style.illustration}
                                            illustration={product.illustration}
                                        />
                                        {product.title}
                                    </Accordion.Header>
                                    <Accordion.Content>
                                        <div>
                                            {detailComponents?.map(
                                                (components, index) => (
                                                    <ComponentMapper
                                                        componentProps={
                                                            components
                                                        }
                                                        pageProps={props}
                                                        key={index}
                                                    />
                                                )
                                            ) || null}
                                        </div>
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
