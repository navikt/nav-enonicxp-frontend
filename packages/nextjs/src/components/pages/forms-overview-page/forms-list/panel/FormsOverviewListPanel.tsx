import React, { useState } from 'react';
import { fetchPageCacheContent } from 'utils/fetch/fetch-cache-content';
import { ContentType } from 'types/content-props/_content-common';
import { SkjemadetaljerListItemProps, FormsOverviewData } from 'types/content-props/forms-overview';
import {
    Skjemadetaljer,
    SkjemadetaljerComponentProps,
} from 'components/_common/skjemadetaljer/Skjemadetaljer';
import { SkjemadetaljerPageProps } from 'types/content-props/skjemadetaljer';
import { ProductPanelExpandable } from 'components/_common/productPanelExpandable/ProductPanelExpandable';
import { OversiktMerOmLenke } from 'components/_common/card/overview-microcard/OversiktMerOmLenke';
import style from './FormsOverviewListPanel.module.scss';

type OverviewType = FormsOverviewData['overviewType'];

const getSkjemadetaljerDisplayOptions = (
    overviewType: OverviewType
): SkjemadetaljerComponentProps['displayConfig'] => {
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
    skjemadetaljer: SkjemadetaljerListItemProps;
    overviewType: OverviewType;
    formNumberSelected?: string;
};

export const FormsOverviewListPanel = ({
    skjemadetaljer,
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
    } = skjemadetaljer;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [skjemadetaljerPages, setSkjemadetaljerPages] = useState<
        null | SkjemadetaljerPageProps[]
    >(null);
    const isAddendumPage = overviewType === 'addendum';

    const handleSkjemadetaljerFetch = () => {
        if (isLoading || skjemadetaljerPages) {
            return;
        }

        setIsLoading(true);
        setError(null);

        Promise.all(formDetailsPaths.map(fetchPageCacheContent))
            .then((contentFromCache) => {
                const validSkjemadetaljer = contentFromCache.filter((content) => {
                    if (!content) {
                        setError('Teknisk feil: Noen av skjemainngangene kunne ikke lastes');
                        return false;
                    }

                    return content.type === ContentType.Skjemadetaljer;
                }) as SkjemadetaljerPageProps[];

                setSkjemadetaljerPages(validSkjemadetaljer);
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
            contentLoaderCallback={handleSkjemadetaljerFetch}
            isLoading={isLoading}
            error={error}
            analyticsData={{
                opprinnelse: 'skjemaoversikt accordion',
            }}
            withCopyLink
        >
            <div className={style.formsOverviewListPanel}>
                {skjemadetaljerPages?.map((formDetail) => (
                    <Skjemadetaljer
                        skjemadetaljer={formDetail.data}
                        displayConfig={getSkjemadetaljerDisplayOptions(overviewType)}
                        formNumberSelected={formNumberSelected}
                        key={formDetail._id}
                    />
                ))}
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
            </div>
        </ProductPanelExpandable>
    );
};
