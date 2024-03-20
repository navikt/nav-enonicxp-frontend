import React, { useState, useEffect } from 'react';
import { BodyShort, ExpansionCard, Loader } from '@navikt/ds-react';
import { IllustrationStatic } from 'components/_common/illustration/IllustrationStatic';
import { CopyLink } from 'components/_common/copyLink/copyLink';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { AlertBox } from 'components/_common/alert-box/AlertBox';
import { translator } from 'translations';
import { usePageContextProps } from 'store/pageContext';

import style from './ProductPanelExpandable.module.scss';

type Props = {
    header: string;
    subHeader?: string;
    illustration: AnimatedIconsProps;
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

    const { language } = usePageContextProps();
    const loadingText = translator('overview', language)('loading');

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

    const handleClick = () => {
        logAmplitudeEvent(
            isOpen ? AnalyticsEvents.ACC_COLLAPSE : AnalyticsEvents.ACC_EXPAND,
            {
                tittel: header,
                ...analyticsData,
            }
        );

        setIsOpen(!isOpen);
        contentLoaderCallback?.();
    };

    return (
        <ExpansionCard
            open={isOpen}
            className={style.expandable}
            id={anchorId}
            aria-label={header}
        >
            <ExpansionCard.Header
                onClick={handleClick}
                onMouseOver={contentLoaderCallback}
                onFocus={contentLoaderCallback}
                className={style.expandableHeader}
            >
                <IllustrationStatic
                    className={style.illustration}
                    illustration={illustration}
                />
                <span className={style.panelHeader}>
                    <span>{header}</span>
                    {subHeader && (
                        <span className={style.subHeader}>{subHeader}</span>
                    )}
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
