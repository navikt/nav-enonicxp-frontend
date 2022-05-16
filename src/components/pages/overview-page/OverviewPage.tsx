import React, { useState } from 'react';
import { Accordion } from '@navikt/ds-react';

import { ComponentMapper } from '../../ComponentMapper';
import { OverviewPageProps } from '../../../types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';

import { OverviewFilter } from 'components/_common/overviewFilter/OverviewFilter';
import { Area } from 'types/areas';
import { IllustrationStatic } from 'components/_common/illustration/IllustrationStatic';
import { translator } from 'translations';
import { fetchRelevantProductDetails } from 'utils/fetch/fetch-product-content';
import { ExpandableProductDetails } from 'components/_common/expandableProductDetails/expandableProductDetails';

import style from './OverviewPage.module.scss';
import { usePageConfig } from 'store/hooks/usePageConfig';

export const OverviewPage = (props: OverviewPageProps) => {
    const { productList, overviewType } = props.data;
    const { language } = usePageConfig();

    // Misc translations
    const getTranslationString = translator('overview', language);

    const [areaFilter, setAreaFilter] = useState<Area>(null);
    const [openPanels, setOpenPanels] = useState<string[]>([]);
    const [details, setDetails] = useState<any>({});

    const checkForPanelContent = async (contentId: string) => {
        const productDetails = await fetchRelevantProductDetails(
            contentId,
            overviewType
        );
        setDetails({ ...details, [contentId]: productDetails });
    };

    const handlePanelToggle = (panelId: string) => {
        const foundAtPos = openPanels.findIndex((id) => id === panelId);
        const updatedOpenPanels =
            foundAtPos > -1
                ? openPanels.filter((id) => id !== panelId)
                : [...openPanels, panelId];
        setOpenPanels(updatedOpenPanels);

        checkForPanelContent(panelId);
    };

    const getRegions = (id: string) => {
        return details[id];
    };

    const handleFilterUpdate = (area: Area) => {
        setAreaFilter(area);
    };

    const filteredItems = productList.filter((product) => {
        return product.area == areaFilter;
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
                    {filteredItems.length === 0 && (
                        <div>{getTranslationString('noProducts')}</div>
                    )}
                    {filteredItems.map((product) => {
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
