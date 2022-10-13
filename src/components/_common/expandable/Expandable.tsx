import React, { useEffect, useState } from 'react';
import { Accordion } from '@navikt/ds-react';
import { analyticsEvents, logAmplitudeEvent } from '../../../utils/amplitude';
import { classNames } from '../../../utils/classnames';

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

    const toggleExpandCollapse = () => {
        logAmplitudeEvent(
            isOpen ? analyticsEvents.ACC_COLLAPSE : analyticsEvents.ACC_EXPAND,
            {
                tittel: title,
                opprinnelse: analyticsOriginTag,
            }
        );
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const openOnBrowserSearch = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.code === 'KeyF') {
                setIsOpen(true);
            }
        };

        window.addEventListener('keydown', openOnBrowserSearch);
        return () => window.removeEventListener('keydown', openOnBrowserSearch);
    }, []);

    useEffect(() => {
        if (anchorId && window.location.hash === `#${anchorId}`) {
            setIsOpen(true);
        }
    }, [anchorId]);

    return (
        <Accordion
            id={anchorId}
            className={classNames(className, style.expandableWrapper)}
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
