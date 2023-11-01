import React, { useEffect, useRef, useState } from 'react';
import { Accordion } from '@navikt/ds-react';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { classNames } from 'utils/classnames';
import { smoothScrollToTarget } from 'utils/scroll-to';

import style from './Expandable.module.scss';

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
    const [isHasSupported, setIsHasSupported] = useState(null);
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

    // Firefox does not support :has() selector until v121.
    // Then market penetration is high enough (mid january 2024?), the following hack
    // might safely be removed.
    const checkPsudoHasSupport = () => {
        let userAgent = navigator.userAgent;
        let regex = /Firefox\/(\d+)/;
        let firefox = userAgent.match(regex);

        if (!firefox) {
            // All other major browsers support :has, so assume true
            return true;
        }
        return parseInt(firefox[1], 10) >= 121;
    };

    useEffect(() => {
        setIsHasSupported(checkPsudoHasSupport());

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
            className={classNames(
                className,
                style.expandableWrapper,
                !isHasSupported && style.hasFirefoxHack
            )}
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
