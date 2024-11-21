import React from 'react';
import { ExpandableMixin } from 'types/component-props/_mixins';
import { ComponentEditorProps } from 'components/ComponentMapper';
import { Expandable } from './Expandable';

type Props = {
    children: React.ReactNode;
    editorProps?: ComponentEditorProps;
} & ExpandableMixin;

export const ExpandableComponentWrapper = ({
    expandable,
    expandableTitle,
    expandableAnchorId,
    analyticsOriginTag,
    type,
    ariaLabel,
    children,
    editorProps,
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
            ariaLabel={ariaLabel}
            editorProps={editorProps}
        >
            {children}
        </Expandable>
    );
};
