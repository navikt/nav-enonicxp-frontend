import React from 'react';
import { useXpComponentsConfig } from 'components/xp-components/components-config/xpComponentsConfig';
import { PartComponentProps } from 'types/component-props/parts';

export const XpPartComponent = (props: PartComponentProps) => {
    const Component = useXpComponentsConfig().parts[props.descriptor];

    return null;
};
