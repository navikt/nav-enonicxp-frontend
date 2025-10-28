import React, { useState, useEffect, PropsWithChildren } from 'react';
import { BodyLong, BodyShort, ExpansionCard, Loader } from '@navikt/ds-react';
import { PictogramsProps } from 'types/content-props/pictograms';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { CopyLink } from 'components/_common/copyLink/copyLink';
import { Varselboks } from 'components/_common/varselboks/Varselboks';
import { translator } from 'translations';
import { classNames } from 'utils/classnames';
import style from './ProductPanelExpandable.module.scss';

type Props = PropsWithChildren<{
    header: string;
    ingress?: string;
    illustration: PictogramsProps;
    anchorId: string;
    contentLoaderCallback?: () => void;
    analyticsData?: Record<string, string>;
    isLoading?: boolean;
    error?: string | null;
    withCopyLink?: boolean;
}>;

export const ProductPanelExpandable = ({
    header,
    ingress,
    anchorId,
    illustration,
    contentLoaderCallback,
    analyticsData,
    isLoading,
    error,
    withCopyLink = false,
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

    // Need an override until we remove the old overview page
    const alignCenter = contentProps.type === 'no.nav.navno:overview';

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
                className={classNames(style.expandableHeader, alignCenter && style.alignCenter)}
                onMouseOver={contentLoaderCallback}
                onFocus={contentLoaderCallback}
            >
                <IllustrationStatic className={style.illustration} illustration={illustration} />
                <div className={style.panelHeader}>
                    <span className={style.title}>{header}</span>
                    {ingress && <BodyLong className={style.ingress}>{ingress}</BodyLong>}
                </div>
            </ExpansionCard.Header>
            <ExpansionCard.Content className={style.expandableContent}>
                {error && <Varselboks variant={'error'}>{error}</Varselboks>}
                {withCopyLink && (
                    <CopyLink
                        anchor={anchorIdWithHash}
                        heading={header}
                        className={style.copyLink}
                    />
                )}
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
