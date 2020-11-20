import React from 'react';
import { ParsedHtml } from '../ParsedHtml';
import { TextComponent } from '../../../../types/components/_common';

export const Text = ({ value }: TextComponent) => {
    if (!value) {
        return null;
    }

    return (
        <div className={'typo-normal'}>
            <ParsedHtml content={value} />
        </div>
    );
};
