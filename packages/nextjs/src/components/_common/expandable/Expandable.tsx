import React, { PropsWithChildren, useRef, useState } from 'react';
import { ExpansionCard } from '@navikt/ds-react';
import { BarChartIcon, BriefcaseClockIcon, CalendarIcon, TasklistIcon } from '@navikt/aksel-icons';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { classNames } from 'utils/classnames';
import { handleStickyScrollOffset } from 'utils/scroll-to';
import { Snarveier, useSnarveier } from 'utils/useSnarveier';
import { ProductDetailType } from 'types/content-props/product-details';
import { useCheckAndOpenPanel } from 'store/hooks/useCheckAndOpenPanel';
import style from './Expandable.module.scss';

type Props = PropsWithChildren<{
    title: string;
    anchorId?: string;
    analyticsOriginTag?: string;
    className?: string;
    expandableType?: ProductDetailType | 'documentation_requirements';
    ariaLabel?: string;
    isOpenDefault?: boolean;
}>;

export const Expandable = ({
    title,
    anchorId,
    analyticsOriginTag,
    children,
    className,
    expandableType,
    ariaLabel,
    isOpenDefault,
}: Props) => {
    const [isOpen, setIsOpen] = useState(isOpenDefault ?? false);
    const trekkspillRef = useRef<HTMLDivElement | null>(null);
    const contentProps = usePageContentProps();
    const { context } = getDecoratorParams(contentProps);

    useSnarveier({ shortcut: Snarveier.SEARCH, callback: () => setIsOpen(true) });
    useCheckAndOpenPanel(isOpen, setIsOpen, trekkspillRef, anchorId);

    const toggleExpandCollapse = (isOpening: boolean, tittel: string) => {
        setIsOpen(isOpening);
        handleStickyScrollOffset(isOpening, trekkspillRef.current);
        logAnalyticsEvent(isOpening ? AnalyticsEvents.ACC_EXPAND : AnalyticsEvents.ACC_COLLAPSE, {
            tittel,
            opprinnelse: analyticsOriginTag || 'utvidbar tekst',
            komponent: 'Expandable',
            målgruppe: context,
            innholdstype: innholdsTypeMap[contentProps.type],
        });
    };

    const getHeaderIcon = () => {
        switch (expandableType) {
            case ProductDetailType.PROCESSING_TIMES:
                return <BriefcaseClockIcon aria-hidden className={style.headerIcon} />;
            case ProductDetailType.PAYOUT_DATES:
                return <CalendarIcon aria-hidden className={style.headerIcon} />;
            case ProductDetailType.RATES:
                return <BarChartIcon aria-hidden className={style.headerIcon} />;
            case 'documentation_requirements':
                return <TasklistIcon aria-hidden className={style.headerIcon} />;
            default:
                return null;
        }
    };

    // Adjust appearande in styling if not type was set for this content
    // This is the wrong use of this component, but some legacy pages have still to
    // be upradet editorial wise.
    const isLegacyUsage = !expandableType;

    return (
        <ExpansionCard
            id={anchorId}
            className={classNames(className, style.expandable, isLegacyUsage && style.legacy)}
            ref={trekkspillRef}
            onToggle={(isOpen) => toggleExpandCollapse(isOpen, title)}
            open={isOpen}
            aria-label={ariaLabel || title}
            tabIndex={-1}
        >
            <ExpansionCard.Header className={style.header}>
                {getHeaderIcon()}
                <div className={style.headerTitle}>{title}</div>
            </ExpansionCard.Header>
            <ExpansionCard.Content className={style.content}>{children}</ExpansionCard.Content>
        </ExpansionCard>
    );
};
