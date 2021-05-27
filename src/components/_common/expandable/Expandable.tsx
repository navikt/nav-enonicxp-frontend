import React, { useState } from 'react';
import { ExpandableMixin } from '../../../types/component-props/_mixins';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { logAmplitudeEvent } from '../../../utils/amplitude';
import './Expandable.less';

type Props = {
    children: React.ReactNode;
} & ExpandableMixin;

export const Expandable = ({
    expandable,
    expandableTitle,
    expandableOpenByDefault,
    children,
}: Props) => {
    const [isOpen, setIsOpen] = useState(expandableOpenByDefault);

    if (!expandable) {
        return <>{children}</>;
    }

    return (
        <Ekspanderbartpanel
            tittel={expandableTitle}
            border={false}
            apen={expandableOpenByDefault}
            renderContentWhenClosed={true}
            className={'expandable'}
            onClick={() => {
                logAmplitudeEvent(`panel-${isOpen ? 'kollaps' : 'ekspander'}`, {
                    tittel: expandableTitle,
                });
                setIsOpen(!isOpen);
            }}
        >
            {children}
        </Ekspanderbartpanel>
    );
};
