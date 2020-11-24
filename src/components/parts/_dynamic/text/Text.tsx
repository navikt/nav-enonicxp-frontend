import React from 'react';
import { ParsedHtml } from '../ParsedHtml';
import { TextComponentProps } from '../../../../types/component-props/_component-common';

export const Text = ({ value }: TextComponentProps) => {
    if (!value) {
        return null;
    }

    return (
        <div className={'typo-normal'}>
            <ParsedHtml content={value} />
        </div>
    );
};
