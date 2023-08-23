import React, { useState } from 'react';
import { fetchPageCacheContent } from 'utils/fetch/fetch-cache-content';
import { ContentType } from 'types/content-props/_content-common';
import {
    FormDetailsListItemProps,
    FormsOverviewData,
} from 'types/content-props/forms-overview';
import {
    FormDetails,
    FormDetailsComponentProps,
} from 'components/_common/form-details/FormDetails';
import { FormDetailsPageProps } from 'types/content-props/form-details';
import { ProductPanelExpandable } from 'components/_common/product-panel/ProductPanelExpandable';
import { BodyLong } from '@navikt/ds-react';
import { FormsOverviewProductLink } from 'components/pages/forms-overview-page/forms-list/panel/product-link/FormsOverviewProductLink';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { Language, translator } from 'translations';

import style from './FormsOverviewListPanel.module.scss';

type OverviewType = FormsOverviewData['overviewType'];

const getFormDetailsDisplayOptions = (
    overviewType: OverviewType
): FormDetailsComponentProps['displayConfig'] => {
    return {
        showTitle: true,
        showIngress: overviewType !== 'addendum',
        showAddendums: true,
        showApplications: overviewType === 'application',
        showComplaints: overviewType === 'complaint',
        showFormNumbers: true,
    };
};

const buildSubHeader = (
    taxonomy: FormDetailsListItemProps['taxonomy'],
    area: FormDetailsListItemProps['area'],
    language: Language
) => {
    const taxonomyTranslations = translator('taxonomies', language);
    const areaTranslations = translator('areas', language);

    return [
        ...taxonomy.map(taxonomyTranslations),
        ...area.map(areaTranslations),
    ]
        .filter(Boolean)
        .join(', ');
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
        taxonomy,
        area,
    } = formDetails;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formDetailsPages, setFormDetailsPages] = useState<
        null | FormDetailsPageProps[]
    >(null);

    const { language } = usePageConfig();

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
                        setError(
                            'Teknisk feil: Noen av skjemainngangene kunne ikke lastes'
                        );
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
            subHeader={buildSubHeader(taxonomy, area, language)}
            illustration={illustration}
            anchorId={anchorId}
            contentLoaderCallback={handleFormDetailsFetch}
            isLoading={isLoading}
            error={error}
            analyticsData={{
                opprinnelse: 'skjemaoversikt accordion',
            }}
        >
            {!isAddendumPage && (
                <BodyLong className={style.ingress}>{ingress}</BodyLong>
            )}
            {formDetailsPages?.map((formDetail) => (
                <FormDetails
                    formDetails={formDetail.data}
                    displayConfig={getFormDetailsDisplayOptions(overviewType)}
                    className={style.formDetails}
                    formNumberSelected={formNumberSelected}
                    key={formDetail._id}
                />
            ))}
            {!isAddendumPage && url && (
                <FormsOverviewProductLink type={type} url={url} title={title} />
            )}
        </ProductPanelExpandable>
    );
};
