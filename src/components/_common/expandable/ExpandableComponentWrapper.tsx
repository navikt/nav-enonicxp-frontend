import React from 'react';
import { ExpandableMixin } from 'types/component-props/_mixins';
import { Expandable } from './Expandable';

type Props = {
    children: React.ReactNode;
} & ExpandableMixin;

export const ExpandableComponentWrapper = ({
    expandable,
    expandableTitle,
    expandableAnchorId,
    analyticsOriginTag = '',
    type,
    visibilityType,
    children,
}: Props) => {
    if (!expandable) {
        return <>{children}</>;
    }

    return (
        <Expandable
            title={expandableTitle}
            anchorId={expandableAnchorId}
            analyticsOriginTag={analyticsOriginTag}
            expandableType={type}
            visibilityType={visibilityType}
        >
            {children}
        </Expandable>
    );
};
