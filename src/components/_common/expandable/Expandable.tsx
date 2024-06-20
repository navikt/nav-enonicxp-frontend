import React, { useEffect, useId, useRef, useState } from 'react';
import { ExpansionCard } from '@navikt/ds-react';
import { BarChartIcon, BriefcaseClockIcon, CalendarIcon, TasklistIcon } from '@navikt/aksel-icons';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { classNames } from 'utils/classnames';
import { smoothScrollToTarget } from 'utils/scroll-to';
import { Shortcuts, useShortcuts } from 'utils/useShortcuts';

import style from './Expandable.module.scss';

type Props = {
    title: string;
    anchorId?: string;
    analyticsOriginTag?: string;
    className?: string;
    children: React.ReactNode;
    expandableType?: 'processing_times' | 'payout_dates' | 'rates' | 'documentation_requirements';
};

export const Expandable = ({
    title,
    anchorId,
    analyticsOriginTag,
    children,
    className,
    expandableType,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const accordionRef = useRef<HTMLDivElement | null>(null);
    const componentId = useId();

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
        if (expandableType === 'processing_times') {
            return <BriefcaseClockIcon aria-hidden className={style.headerIcon} />;
        }
        if (expandableType === 'payout_dates') {
            return <CalendarIcon aria-hidden className={style.headerIcon} />;
        }
        if (expandableType === 'rates') {
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
            onToggle={toggleExpandCollapse}
            open={isOpen}
            aria-labelledby={componentId}
        >
            <ExpansionCard.Header className={style.header} id={componentId}>
                {getHeaderIcon()}
                <div className={style.headerTitle}>{title}</div>
            </ExpansionCard.Header>
            <ExpansionCard.Content className={style.content}>{children}</ExpansionCard.Content>
        </ExpansionCard>
    );
};
