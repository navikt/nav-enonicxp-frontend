import React from 'react';
import { MicroCardProps } from '../../../../types/component-props/parts/micro-card';

export const MicroCardPart = ({ config }: MicroCardProps) => {
    if (!config.targetPage) {
        return <div>{'Tom felt'}</div>;
    }
    return <div>Hello world! {config.targetPage.displayName}</div>;
};
