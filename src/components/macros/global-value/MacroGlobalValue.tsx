import React from 'react';
import { MacroGlobalValueProps } from '../../../types/macro-props/global-value';

export const MacroGlobalValue = ({ config }: MacroGlobalValueProps) => {
    if (!config?.global_value) {
        return null;
    }

    return <>{config.global_value.value}</>;
};
