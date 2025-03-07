import React, { useState, useEffect } from 'react';
import { BodyShort, ExpansionCard, Loader } from '@navikt/ds-react';
import { PictogramsProps } from 'types/content-props/pictograms';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { CopyLink } from 'components/_common/copyLink/copyLink';
import { AlertBox } from 'components/_common/alertBox/AlertBox';
import { translator } from 'translations';

import style from './ProductPanelExpandable.module.scss';

type Props = {
    header: string;
    subHeader?: string;
    illustration: PictogramsProps;
    anchorId: string;
    contentLoaderCallback?: () => void;
    analyticsData?: Record<string, string>;
    isLoading?: boolean;
    error?: string | null;
    withCopyLink?: boolean;
    children: React.ReactNode;
};

export const ProductPanelExpandable = ({
    header,
    subHeader,
    anchorId,
    illustration,
    contentLoaderCallback,
    analyticsData,
    isLoading,
    error,
    withCopyLink = true,
    children,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentProps = usePageContentProps();
    const { context } = getDecoratorParams(contentProps);
    const loadingText = translator('overview', contentProps.language)('loading');
    const anchorIdWithHash = `#${anchorId}`;
    const checkHashAndExpandPanel = () => {
        if (window.location.hash === anchorIdWithHash) {
            contentLoaderCallback?.();
            setIsOpen(true);
        }
    };

    useEffect(() => {
        checkHashAndExpandPanel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anchorIdWithHash]);

    useEffect(() => {
        window.addEventListener('hashchange', checkHashAndExpandPanel);

        return () => {
            window.removeEventListener('hashchange', checkHashAndExpandPanel);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleExpandCollapse = (isOpening: boolean, tittel: string) => {
        setIsOpen(isOpening);
        contentLoaderCallback?.();
        logAnalyticsEvent(isOpening ? AnalyticsEvents.ACC_EXPAND : AnalyticsEvents.ACC_COLLAPSE, {
            tittel,
            opprinnelse: 'produktdetalj',
            komponent: 'ProductPanelExpandable',
            målgruppe: context,
            innholdstype: innholdsTypeMap[contentProps.type],
            ...analyticsData,
        });
    };

    return (
        <ExpansionCard
            className={style.expandable}
            id={anchorId}
            open={isOpen}
            onToggle={(isOpen) => toggleExpandCollapse(isOpen, header)}
            aria-label={header}
        >
            <ExpansionCard.Header
                className={style.expandableHeader}
                onMouseOver={contentLoaderCallback}
                onFocus={contentLoaderCallback}
            >
                <IllustrationStatic className={style.illustration} illustration={illustration} />
                <span className={style.panelHeader}>
                    <span>{header}</span>
                    {subHeader && <span className={style.subHeader}>{subHeader}</span>}
                </span>
            </ExpansionCard.Header>
            <ExpansionCard.Content className={style.expandableContent}>
                {withCopyLink && (
                    <CopyLink
                        anchor={anchorIdWithHash}
                        heading={header}
                        className={style.copyLink}
                    />
                )}
                {error && <AlertBox variant={'error'}>{error}</AlertBox>}
                {isLoading ? (
                    <div className={style.loader}>
                        <Loader size={'2xlarge'} />
                        <BodyShort>{loadingText}</BodyShort>
                    </div>
                ) : (
                    children
                )}
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
