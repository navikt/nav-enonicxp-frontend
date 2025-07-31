import React, { useState } from 'react';
import { BodyLong } from '@navikt/ds-react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { fetchPageCacheContent } from 'utils/fetch/fetch-cache-content';
import { ContentType } from 'types/content-props/_content-common';
import {
    Skjemadetaljer,
    FormDetailsComponentProps,
} from 'components/_common/skjemadetaljer/Skjemadetaljer';
import { FormDetailsPageProps } from 'types/content-props/skjemadetaljer';
import { ProductPanelExpandable } from 'components/_common/productPanelExpandable/ProductPanelExpandable';
import { OversiktMerOmLenke } from 'components/_common/card/overview-microcard/OversiktMerOmLenke';
import { OversiktItemListItem, OversiktPageData } from 'types/content-props/oversikt-props';
import { ProductDetailsProps } from 'types/content-props/dynamic-page-props';
import { ProductDetails } from 'components/_common/productDetails/ProductDetails';
import { ProductDetailType } from 'types/content-props/product-details';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { LenkeStandalone } from 'components/_common/lenke/lenkeStandalone/LenkeStandalone';
import style from './OversiktListPanel.module.scss';

type OversiktType = OversiktPageData['oversiktType'];

const getFormDetailsDisplayOptions = (
    oversiktType: OversiktType
): FormDetailsComponentProps['displayConfig'] => {
    return {
        showTitle: true,
        showIngress: true,
        showAddendums: true,
        showApplications: oversiktType === 'application',
        showComplaints: oversiktType === 'complaint',
        showFormNumbers: true,
    };
};

type Props = {
    panelDetails: OversiktItemListItem;
    oversiktType: OversiktType;
    formNumberSelected?: string;
};

export const OversiktListPanel = ({ panelDetails, oversiktType, formNumberSelected }: Props) => {
    const {
        anchorId,
        illustration,
        subItems,
        title,
        sortTitle,
        url,
        ingress,
        type,
        targetLanguage,
    } = panelDetails;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loadedPanelDetails, setLoadedPanelDetails] = useState<
        null | FormDetailsPageProps[] | ProductDetailsProps[]
    >(null);
    const isAddendumPage = oversiktType === 'addendum';
    const isTjenesterOversikt = oversiktType === ProductDetailType.ALL_PRODUCTS;

    const handlePanelDetailsFetch = () => {
        if (isLoading || loadedPanelDetails) {
            return;
        }

        setIsLoading(true);
        setError(null);

        const itemPaths = subItems.map((subItem) => subItem.path);

        Promise.all(itemPaths.map(fetchPageCacheContent))
            .then((contentFromCache) => {
                const validItemsContent = contentFromCache.filter((content) => {
                    if (!content) {
                        setError('Teknisk feil: Noen av skjemainngangene kunne ikke lastes');
                        return false;
                    }

                    return (
                        content.type === ContentType.FormDetails ||
                        content.type === ContentType.ProductDetails
                    );
                }) as FormDetailsPageProps[] | ProductDetailsProps[];

                setLoadedPanelDetails(validItemsContent);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    if (isTjenesterOversikt) {
        return (
            <div className={style.tjenesterPanel}>
                <IllustrationStatic illustration={illustration} className={style.icon} />
                <LenkeStandalone
                    href={url}
                    title={title}
                    className={style.title}
                    tekstClassName={style.lenketekst}
                >
                    {title}
                </LenkeStandalone>
                <BodyLong className={style.tjenesterIngress}>{ingress}</BodyLong>
                <ArrowRightIcon title="Pil høyre" className={style.arrow} />
            </div>
        );
    }

    return (
        <ProductPanelExpandable
            header={sortTitle}
            ingress={ingress}
            illustration={illustration}
            anchorId={anchorId}
            contentLoaderCallback={handlePanelDetailsFetch}
            isLoading={isLoading}
            error={error}
            analyticsData={{
                opprinnelse: 'skjemaoversikt accordion',
            }}
            withCopyLink
        >
            <div className={style.oversiktListPanel}>
                {loadedPanelDetails?.map((panelDetail) => {
                    if (panelDetail.type === ContentType.FormDetails) {
                        return (
                            <Skjemadetaljer
                                formDetails={panelDetail.data}
                                displayConfig={getFormDetailsDisplayOptions(oversiktType)}
                                formNumberSelected={formNumberSelected}
                                key={panelDetail._id}
                            />
                        );
                    }
                    if (panelDetail.type === ContentType.ProductDetails) {
                        return (
                            <ProductDetails productDetails={panelDetail} key={panelDetail._id} />
                        );
                    }
                })}
                {!isAddendumPage && url && (
                    <OversiktMerOmLenke
                        className={style.merOmLenke}
                        productLinks={[
                            {
                                type,
                                url,
                                title,
                                language: targetLanguage,
                            },
                        ]}
                    />
                )}
            </div>
        </ProductPanelExpandable>
    );
};
