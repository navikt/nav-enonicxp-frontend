import React, { useState } from 'react';
import { fetchPageCacheContent } from 'utils/fetch/fetch-cache-content';
import { ContentType } from 'types/content-props/_content-common';
import { FormDetailsListItemProps, FormsOverviewData } from 'types/content-props/forms-overview';
import {
    FormDetails,
    FormDetailsComponentProps,
} from 'components/_common/form-details/FormDetails';
import { FormDetailsPageProps } from 'types/content-props/form-details';
import { ProductPanelExpandable } from 'components/_common/productPanelExpandable/ProductPanelExpandable';
import { OversiktMerOmLenke } from 'components/_common/card/overview-microcard/OversiktMerOmLenke';

import style from './FormsOverviewListPanel.module.scss';

type OverviewType = FormsOverviewData['overviewType'];

const getFormDetailsDisplayOptions = (
    overviewType: OverviewType
): FormDetailsComponentProps['displayConfig'] => {
    return {
        showTitle: true,
        showIngress: true,
        showAddendums: true,
        showApplications: overviewType === 'application',
        showComplaints: overviewType === 'complaint',
        showFormNumbers: true,
    };
};

type Props = {
    formDetails: FormDetailsListItemProps;
    overviewType: OverviewType;
    formNumberSelected?: string;
};

export const FormsOverviewListPanel = ({
    formDetails,
    overviewType,
    formNumberSelected,
}: Props) => {
    const {
        anchorId,
        illustration,
        formDetailsPaths,
        title,
        sortTitle,
        url,
        ingress,
        type,
        targetLanguage,
    } = formDetails;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [formDetailsPages, setFormDetailsPages] = useState<null | FormDetailsPageProps[]>(null);
    const isAddendumPage = overviewType === 'addendum';

    const handleFormDetailsFetch = () => {
        if (isLoading || formDetailsPages) {
            return;
        }

        setIsLoading(true);
        setError(null);

        Promise.all(formDetailsPaths.map(fetchPageCacheContent))
            .then((contentFromCache) => {
                const validFormDetails = contentFromCache.filter((content) => {
                    if (!content) {
                        setError('Teknisk feil: Noen av skjemainngangene kunne ikke lastes');
                        return false;
                    }

                    return content.type === ContentType.FormDetails;
                }) as FormDetailsPageProps[];

                setFormDetailsPages(validFormDetails);
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
            contentLoaderCallback={handleFormDetailsFetch}
            isLoading={isLoading}
            error={error}
            analyticsData={{
                opprinnelse: 'skjemaoversikt accordion',
            }}
            withCopyLink
        >
            <div className={style.formsOverviewListPanel}>
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
                {formDetailsPages?.map((formDetail) => (
                    <FormDetails
                        formDetails={formDetail.data}
                        displayConfig={getFormDetailsDisplayOptions(overviewType)}
                        formNumberSelected={formNumberSelected}
                        key={formDetail._id}
                    />
                ))}
            </div>
        </ProductPanelExpandable>
    );
};
