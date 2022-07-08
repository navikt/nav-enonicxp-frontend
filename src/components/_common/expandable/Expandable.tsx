import React, { useState } from 'react';
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

    const onExpandCollapse = () => {
        logAmplitudeEvent(
            isOpen ? analyticsEvents.ACC_COLLAPSE : analyticsEvents.ACC_EXPAND,
            {
                tittel: title,
                opprinnelse: analyticsOriginTag,
            }
        );
        setIsOpen(!isOpen);
    };

    return (
        <Accordion
            id={anchorId}
            className={classNames(className, style.expandableWrapper)}
        >
            <Accordion.Item
                renderContentWhenClosed={true}
                className={style.expandable}
            >
                <Accordion.Header onClick={onExpandCollapse}>
                    {title}
                </Accordion.Header>
                <Accordion.Content>{children}</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
