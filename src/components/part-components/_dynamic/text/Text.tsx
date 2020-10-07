import React from 'react';
import { DynamicText } from 'types/content-types/_dynamic/text';
import { ParsedHtml } from '../ParsedHtml';

export const Text = ({ text }: DynamicText) => {
    const value = text.value;
    return (
        <div className={'typo-normal'}>
            <ParsedHtml content={value} />
        </div>
    );
};
