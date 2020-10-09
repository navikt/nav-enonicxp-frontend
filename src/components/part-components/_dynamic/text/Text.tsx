import React from 'react';
import { DynamicText } from 'types/content-types/_dynamic/text';
import { ParsedHtml } from '../ParsedHtml';

export const Text = (props: DynamicText) => {
    const value = props.text?.value;

    if (!value) {
        return null;
    }

    return (
        <div className={'typo-normal'}>
            <ParsedHtml content={value} />
        </div>
    );
};
