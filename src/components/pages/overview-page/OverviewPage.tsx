import React, { useState } from 'react';
import { Accordion } from '@navikt/ds-react';
import { translator } from 'translations';

import { Area } from 'types/areas';
import { OverviewPageProps } from 'types/content-props/dynamic-page-props';

import { usePageConfig } from 'store/hooks/usePageConfig';
import { fetchRelevantProductDetails } from 'utils/fetch/fetch-product-details';

import { ComponentMapper } from 'components/ComponentMapper';
import { ExpandableProductDetails } from 'components/_common/expandableProductDetails/expandableProductDetails';
import { IllustrationStatic } from 'components/_common/illustration/IllustrationStatic';
import { OverviewFilter } from 'components/_common/overviewFilter/OverviewFilter';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';

import style from './OverviewPage.module.scss';
import ErrorPage404 from 'pages/404';

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

    const fetchPanelContent = async (contentId: string) => {
        // Don't check if we already have the content.
        if (details[contentId]) {
            return;
        }

        const productDetails = await fetchRelevantProductDetails(
            contentId,
            overviewType
        );
        setDetails({ ...details, [contentId]: productDetails });
    };

    const handlePanelToggle = (panelId: string) => {
        const isOpening = openPanels.findIndex((id) => id === panelId) === -1;
        const updatedOpenPanels = isOpening
            ? [...openPanels, panelId]
            : openPanels.filter((id) => id !== panelId);

        setOpenPanels(updatedOpenPanels);

        if (isOpening) {
            fetchPanelContent(panelId);
        }
    };

    const getRegions = (id: string) => {
        return details[id];
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
                        const regions = getRegions(product._id);
                        return (
                            <Accordion key={product._id}>
                                <Accordion.Item
                                    renderContentWhenClosed
                                    open={openPanels.includes(product._id)}
                                >
                                    <Accordion.Header
                                        onClick={() =>
                                            handlePanelToggle(product._id)
                                        }
                                    >
                                        <IllustrationStatic
                                            className={style.illustration}
                                            illustration={product.illustration}
                                        />
                                        {product.title}
                                    </Accordion.Header>
                                    <Accordion.Content>
                                        <div className={style.detailsContainer}>
                                            <ExpandableProductDetails
                                                productDetails={product}
                                                productRegions={regions}
                                                pageProps={props}
                                            />
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
