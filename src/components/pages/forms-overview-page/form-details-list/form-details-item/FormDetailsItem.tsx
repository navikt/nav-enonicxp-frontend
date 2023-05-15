import React, { useState, useEffect } from 'react';
import { Accordion, BodyShort, Loader } from '@navikt/ds-react';
import { IllustrationStatic } from 'components/_common/illustration/IllustrationStatic';
import { fetchPageCacheContent } from 'utils/fetch/fetch-cache-content';
import { AlertBox } from 'components/_common/alert-box/AlertBox';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { classNames } from 'utils/classnames';
import { translator } from 'translations';
import { CopyLink } from 'components/_common/copyLink/copyLink';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { FormDetailsListItem } from 'types/content-props/forms-overview';

import style from '../../../overview-page/product-elements/ProductDetailsPanel.module.scss';
import { ContentMapper } from 'components/ContentMapper';

type Props = {
    pageProps: ContentProps;
    formDetails: FormDetailsListItem;
    visible: boolean;
};

export const FormDetailsPanel = ({
    pageProps,
    formDetails,
    visible,
}: Props) => {
    const { anchorId, illustration, formDetailsPaths, title, area, taxonomy } =
        formDetails;

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formDetailsPages, setFormDetailsPages] = useState(null);

    const { language } = usePageConfig();

    const loadingText = translator('overview', language)('loading');

    const anchorIdWithHash = `#${anchorId}`;

    useEffect(() => {
        if (window.location.hash === anchorIdWithHash) {
            handleFormDetailsFetch();
            setIsOpen(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anchorIdWithHash]);

    const handleClick = () => {
        logAmplitudeEvent(
            isOpen ? AnalyticsEvents.ACC_COLLAPSE : AnalyticsEvents.ACC_EXPAND,
            {
                tittel: title,
                opprinnelse: 'skjemaoversikt accordion',
            }
        );
        setIsOpen(!isOpen);
        handleFormDetailsFetch();
    };

    const handleFormDetailsFetch = () => {
        if (isLoading || formDetailsPages) {
            return;
        }

        setIsLoading(true);

        fetchPageCacheContent(formDetailsPaths[0])
            .then((contentFromCache) => {
                if (
                    !contentFromCache ||
                    contentFromCache.type !== ContentType.FormDetails
                ) {
                    setError('Teknisk feil: Kunne ikke laste skjemadetalj');
                    return null;
                }

                setError(null);
                setFormDetailsPages(contentFromCache);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <div id={anchorId} />
            <Accordion className={classNames(!visible && style.hidden)}>
                <Accordion.Item open={isOpen} className={style.accordionItem}>
                    <Accordion.Header
                        onClick={handleClick}
                        onMouseOver={
                            formDetailsPages ? null : handleFormDetailsFetch
                        }
                    >
                        <IllustrationStatic
                            className={style.illustration}
                            illustration={illustration}
                        />
                        {title}
                    </Accordion.Header>
                    <Accordion.Content>
                        {error && (
                            <AlertBox variant={'error'}>{error}</AlertBox>
                        )}
                        <CopyLink
                            anchor={anchorIdWithHash}
                            className={style.copyLink}
                        />
                        {isLoading ? (
                            <div className={style.detailsLoader}>
                                <Loader size={'2xlarge'} />
                                <BodyShort>{loadingText}</BodyShort>
                            </div>
                        ) : formDetailsPages ? (
                            <ContentMapper content={formDetailsPages} />
                        ) : null}
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </>
    );
};
