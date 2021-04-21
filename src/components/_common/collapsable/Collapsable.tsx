import React from 'react';
import { BEM } from '../../../utils/classnames';
import { CollapsableMixin } from '../../../types/component-props/_mixins';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import './Collapsable.less';

const bem = BEM('collapsable');

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
            className={bem()}
        >
            {children}
        </Ekspanderbartpanel>
    );
};
