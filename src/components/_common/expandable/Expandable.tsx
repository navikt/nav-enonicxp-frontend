import React, { useEffect, useRef, useState } from 'react';
import { ExpansionCard } from '@navikt/ds-react';
import { BarChartIcon, BriefcaseClockIcon, CalendarIcon, TasklistIcon } from '@navikt/aksel-icons';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { classNames } from 'utils/classnames';
import { smoothScrollToTarget } from 'utils/scroll-to';
import { Shortcuts, useShortcuts } from 'utils/useShortcuts';
import {
    ProcessingTimesVisibilityType,
    ProductDetailType,
} from 'types/content-props/product-details';
import { usePageContentProps } from 'store/pageContext';
import { translator } from 'translations';

import style from './Expandable.module.scss';

type Props = {
    title: string;
    anchorId?: string;
    analyticsOriginTag?: string;
    className?: string;
    children: React.ReactNode;
    expandableType?: ProductDetailType;
    visibilityType?: ProcessingTimesVisibilityType;
};

export const Expandable = ({
    title,
    anchorId,
    analyticsOriginTag,
    children,
    className,
    expandableType,
    visibilityType,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const accordionRef = useRef<HTMLDivElement | null>(null);
    const { language } = usePageContentProps();

    useShortcuts({
        shortcut: Shortcuts.SEARCH,
        callback: () => {
            setIsOpen(true);
        },
    });

    const toggleExpandCollapse = () => {
        logAmplitudeEvent(isOpen ? AnalyticsEvents.ACC_COLLAPSE : AnalyticsEvents.ACC_EXPAND, {
            tittel: title,
            opprinnelse: analyticsOriginTag,
        });
        setIsOpen(!isOpen);
    };

    const checkAndOpenPanel = () => {
        if (isOpen) {
            return;
        }

        const targetId = window.location.hash.replace('#', '');
        if (!targetId) {
            return;
        }

        if (targetId === anchorId) {
            setIsOpen(true);
            return;
        }

        const elementWithId = document.getElementById(targetId);
        if (accordionRef.current?.contains(elementWithId)) {
            setIsOpen(true);
            setTimeout(() => smoothScrollToTarget(targetId), 500);
        }
    };

    const hashChangeHandler = () => {
        checkAndOpenPanel();
    };

    const getHeaderIcon = () => {
        if (expandableType === ProductDetailType.PROCESSING_TIMES) {
            return <BriefcaseClockIcon aria-hidden className={style.headerIcon} />;
        }
        if (expandableType === ProductDetailType.PAYOUT_DATES) {
            return <CalendarIcon aria-hidden className={style.headerIcon} />;
        }
        if (expandableType === ProductDetailType.RATES) {
            return <BarChartIcon aria-hidden className={style.headerIcon} />;
        }
        if (expandableType === ProductDetailType.DOC_REQUIREMENTS) {
            return <TasklistIcon aria-hidden className={style.headerIcon} />;
        }
        return null;
    };

    useEffect(() => {
        window.addEventListener('hashchange', hashChangeHandler);

        return () => {
            window.removeEventListener('hashchange', hashChangeHandler);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        checkAndOpenPanel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anchorId]);

    // Adjust appearande in styling if not type was set for this content
    // This is the wrong use of this component, but some legacy pages have still to
    // be upradet editorial wise.
    const isLegacyUsage = !expandableType;
    const getProductDetailsLabel = translator('productDetailTypes', language);
    const getVisibilityLabel = translator('processingTimesVisibilityTypes', language);
    const label =
        expandableType === ProductDetailType.PROCESSING_TIMES &&
        visibilityType &&
        `${getProductDetailsLabel(ProductDetailType.PROCESSING_TIMES)} ${getVisibilityLabel(
            visibilityType
        )}`;

    return (
        <ExpansionCard
            id={anchorId}
            className={classNames(className, style.expandable, isLegacyUsage && style.legacy)}
            ref={accordionRef}
            onToggle={toggleExpandCollapse}
            open={isOpen}
            aria-label={label || title}
        >
            <ExpansionCard.Header className={style.header}>
                {getHeaderIcon()}
                <div className={style.headerTitle}>{title}</div>
            </ExpansionCard.Header>
            <ExpansionCard.Content className={style.content}>{children}</ExpansionCard.Content>
        </ExpansionCard>
    );
};
