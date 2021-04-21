import React from 'react';
import { CollapsableMixin } from '../../../types/component-props/_mixins';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import './Collapsable.less';

type Props = {
    children: React.ReactElement;
} & CollapsableMixin;

export const Collapsable = ({
    collapsableTitle,
    collapsable,
    collapsableDefault,
    children,
}: Props) => {
    if (!collapsable) {
        return children;
    }

    return (
        <Ekspanderbartpanel
            tittel={collapsableTitle}
            border={false}
            apen={collapsableDefault}
            renderContentWhenClosed={true}
            className={'collapsable'}
        >
            {children}
        </Ekspanderbartpanel>
    );
};
