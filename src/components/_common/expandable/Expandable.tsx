import React, { useEffect, useRef, useState } from 'react';
import { ExpansionCard } from '@navikt/ds-react';
import { BarChartIcon, BriefcaseClockIcon, CalendarIcon, TasklistIcon } from '@navikt/aksel-icons';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { classNames } from 'utils/classnames';
import { smoothScrollToTarget, handleStickyScrollOffset } from 'utils/scroll-to';
import { Shortcuts, useShortcuts } from 'utils/useShortcuts';
import { ProductDetailType } from 'types/content-props/product-details';

import style from './Expandable.module.scss';

type Props = {
    title: string;
    anchorId?: string;
    analyticsOriginTag?: string;
    className?: string;
    children: React.ReactNode;
    expandableType?: ProductDetailType | 'documentation_requirements';
    ariaLabel?: string;
    isOpenDefault?: boolean;
};

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
    const accordionRef = useRef<HTMLDivElement | null>(null);
    const contentProps = usePageContentProps();
    const { context } = getDecoratorParams(contentProps);

    useShortcuts({
        shortcut: Shortcuts.SEARCH,
        callback: () => {
            setIsOpen(true);
        },
    });

    const toggleExpandCollapse = (isOpening: boolean, tittel: string) => {
        setIsOpen(isOpening);
        handleStickyScrollOffset(isOpening, accordionRef.current);

        logAnalyticsEvent(isOpening ? AnalyticsEvents.ACC_EXPAND : AnalyticsEvents.ACC_COLLAPSE, {
            tittel,
            opprinnelse: analyticsOriginTag || 'utvidbar tekst',
            komponent: 'Expandable',
            målgruppe: context,
            innholdstype: innholdsTypeMap[contentProps.type],
        });
    };

    const checkAndOpenPanel = () => {
        if (isOpen) {
            return;
        }

        if (window.location.toString().includes('expandall=true')) {
            setIsOpen(true);
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
        if (expandableType === 'documentation_requirements') {
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

    return (
        <ExpansionCard
            id={anchorId}
            className={classNames(className, style.expandable, isLegacyUsage && style.legacy)}
            ref={accordionRef}
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
