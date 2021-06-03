import React from 'react';
import { MicroCardProps } from '../../../../types/component-props/parts/micro-card';
import { ParsedHtml } from '../../../ParsedHtml';

export const MicroCard = ({ config }: MicroCardProps) => {
    console.log(config);
    if (!config?.microcard) {
        return <div>{'Tom felt'}</div>;
    }
    return <div>Hello world!</div>;
};

