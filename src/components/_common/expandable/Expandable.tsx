import React from 'react';
import { ExpandableMixin } from '../../../types/component-props/_mixins';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
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
    if (!expandable) {
        return <>{children}</>;
    }

    return (
        <Ekspanderbartpanel
            tittel={expandableTitle}
            border={false}
            apen={expandableOpenByDefault}
            renderContentWhenClosed={false}
            className={'expandable'}
        >
            {children}
        </Ekspanderbartpanel>
    );
};
