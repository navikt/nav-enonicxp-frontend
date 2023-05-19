import React, { useState } from 'react';
import { fetchPageCacheContent } from 'utils/fetch/fetch-cache-content';
import { ContentType } from 'types/content-props/_content-common';
import {
    FormDetailsListItemProps,
    FormsOverviewData,
} from 'types/content-props/forms-overview';
import { FormDetails } from 'components/_common/form-details/FormDetails';
import { FormDetailsPageProps } from 'types/content-props/form-details';
import { ProductPanelExpandable } from 'components/_common/product-panel/ProductPanelExpandable';
import { MicroCard } from 'components/_common/card/MicroCard';
import { CardType } from 'types/card';
import { Heading, Ingress } from '@navikt/ds-react';

import style from './FormsOverviewListPanel.module.scss';

type OverviewType = FormsOverviewData['overviewType'];

const getFormDetailsDisplayOptions = (overviewType: OverviewType) => {
    return {
        showTitle: true,
        showIngress: overviewType !== 'addendum',
        showAddendums: true,
        showApplications: overviewType !== 'addendum',
    };
};

type Props = {
    formDetails: FormDetailsListItemProps;
    visible: boolean;
    overviewType: OverviewType;
};

export const FormsOverviewListPanel = ({
    formDetails,
    visible,
    overviewType,
}: Props) => {
    const { anchorId, illustration, formDetailsPaths, title, url, ingress } =
        formDetails;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formDetailsPages, setFormDetailsPages] = useState<
        null | FormDetailsPageProps[]
    >(null);

    const handleFormDetailsFetch = () => {
        if (isLoading || formDetailsPages) {
            return;
        }

        setIsLoading(true);
        setError(null);

        Promise.all(formDetailsPaths.map(fetchPageCacheContent))
            .then((contentFromCache) => {
                const validFormDetails = contentFromCache.filter((content) => {
                    if (!content || content.type !== ContentType.FormDetails) {
                        setError(
                            'Teknisk feil: Noen av skjemainngangene kunne ikke lastes'
                        );
                        return false;
                    }

                    return true;
                }) as FormDetailsPageProps[];

                setFormDetailsPages(validFormDetails);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <ProductPanelExpandable
            title={title}
            illustration={illustration}
            visible={visible}
            anchorId={anchorId}
            contentLoaderCallback={handleFormDetailsFetch}
            isLoading={isLoading}
            error={error}
            analyticsData={{
                opprinnelse: 'skjemaoversikt accordion',
            }}
        >
            <Ingress className={style.ingress}>{ingress}</Ingress>
            {formDetailsPages?.map((formDetail) => (
                <FormDetails
                    formDetails={formDetail.data}
                    displayConfig={getFormDetailsDisplayOptions(overviewType)}
                    className={style.formDetails}
                    key={formDetail._id}
                />
            ))}
            <Heading level={'3'} size={'small'}>
                {'Mer om'}
            </Heading>
            <MicroCard
                type={CardType.Product}
                link={{ url: url, text: title }}
            />
        </ProductPanelExpandable>
    );
};
