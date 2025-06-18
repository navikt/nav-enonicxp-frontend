import React, { useState } from 'react';
import { fetchPageCacheContent } from 'utils/fetch/fetch-cache-content';
import { ContentType } from 'types/content-props/_content-common';
import { FormDetails, FormDetailsComponentProps } from 'components/_common/formDetails/FormDetails';
import { FormDetailsPageProps } from 'types/content-props/form-details';
import { ProductPanelExpandable } from 'components/_common/productPanelExpandable/ProductPanelExpandable';
import { OversiktMerOmLenke } from 'components/_common/card/overview-microcard/OversiktMerOmLenke';
import style from './FormsOverviewListPanel.module.scss';
import { OversiktItemListItem, OversiktPageData } from 'types/content-props/oversikt-props';
import { ProductDetailsProps } from 'types/content-props/dynamic-page-props';

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

                    return content.type === ContentType.FormDetails;
                }) as FormDetailsPageProps[] | ProductDetailsProps[];

                setLoadedPanelDetails(validItemsContent);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

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
                {!isAddendumPage && url && (
                    <OversiktMerOmLenke
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
                {loadedPanelDetails?.map((panelDetail) => {
                    if (panelDetail.type === ContentType.FormDetails) {
                        return (
                            <FormDetails
                                formDetails={panelDetail.data}
                                displayConfig={getFormDetailsDisplayOptions(oversiktType)}
                                formNumberSelected={formNumberSelected}
                                key={panelDetail._id}
                            />
                        );
                    }
                })}
            </div>
        </ProductPanelExpandable>
    );
};
