import React, { useEffect, useRef, useState } from 'react';
import { Accordion } from '@navikt/ds-react';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { classNames } from 'utils/classnames';

import style from './Expandable.module.scss';
import { smoothScrollToTarget } from 'utils/scroll-to';

type Props = {
    title: string;
    anchorId?: string;
    analyticsOriginTag?: string;
    className?: string;
    children: React.ReactNode;
};

export const Expandable = ({
    title,
    anchorId,
    analyticsOriginTag,
    children,
    className,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const accordionRef = useRef<HTMLDivElement | null>(null);

    const toggleExpandCollapse = () => {
        logAmplitudeEvent(
            isOpen ? AnalyticsEvents.ACC_COLLAPSE : AnalyticsEvents.ACC_EXPAND,
            {
                tittel: title,
                opprinnelse: analyticsOriginTag,
            }
        );
        setIsOpen(!isOpen);
    };

    const checkAndOpenPanel = () => {
        const { hash } = window.location;
        if (!hash) {
            return;
        }

        const targetId = hash.replace('#', '');
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

    useEffect(() => {
        const openOnBrowserSearch = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.code === 'KeyF') {
                setIsOpen(true);
            }
        };

        window.addEventListener('keydown', openOnBrowserSearch);
        window.addEventListener('hashchange', hashChangeHandler);

        return () => {
            window.removeEventListener('keydown', openOnBrowserSearch);
            window.removeEventListener('hashchange', hashChangeHandler);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        checkAndOpenPanel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anchorId]);

    return (
        <Accordion
            id={anchorId}
            className={classNames(className, style.expandableWrapper)}
            ref={accordionRef}
        >
            <Accordion.Item open={isOpen} className={style.expandable}>
                <Accordion.Header onClick={toggleExpandCollapse}>
                    {title}
                </Accordion.Header>
                <Accordion.Content>{children}</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
