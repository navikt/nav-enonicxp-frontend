import React from 'react';
import { AlertPanelPartProps } from '../../../types/component-props/parts/alert-panel';

export const AlertPanelPart = ({ config }: AlertPanelPartProps) => {
    if (!config) {
        return null;
    }

    const { ingress, header } = config;

    return <div>{'Dette er en ny part!'}</div>;
};
