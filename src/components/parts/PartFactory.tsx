import React from 'react';
import { PartComponent, PartType } from '../../types/component-props/parts';

export const createPart = <Type extends PartType>(
    BaseComponent: PartComponent<Type>
) => {
    return function Part(props: React.ComponentProps<typeof BaseComponent>) {
        return <BaseComponent {...props} />;
    };
};
