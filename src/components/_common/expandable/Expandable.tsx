import React, { useState } from 'react';
import { ExpandableMixin } from '../../../types/component-props/_mixins';
import { Accordion } from '@navikt/ds-react';
import { logAmplitudeEvent } from '../../../utils/amplitude';
import style from './Expandable.module.scss';

type Props = {
    children: React.ReactNode;
} & ExpandableMixin;

export const Expandable = ({
    expandable,
    expandableTitle,
    expandableAnchorId,
    analyticsOriginTag = '',
    children,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!expandable) {
        return <>{children}</>;
    }

    const onExpandCollapse = () => {
        logAmplitudeEvent(`panel-${isOpen ? 'kollaps' : 'ekspander'}`, {
            tittel: expandableTitle,
            opprinnelse: analyticsOriginTag,
        });
        setIsOpen(!isOpen);
    };

    return (
        <Accordion id={expandableAnchorId}>
            <Accordion.Item
                renderContentWhenClosed={true}
                className={style.expandable}
            >
                <Accordion.Header onClick={onExpandCollapse}>
                    {expandableTitle}
                </Accordion.Header>
                <Accordion.Content>{children}</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
