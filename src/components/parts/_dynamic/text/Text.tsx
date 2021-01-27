import React from 'react';
import { ParsedHtml } from '../../../ParsedHtml';
import {
    ComponentType,
    TextComponentProps,
} from '../../../../types/component-props/_component-common';

export const Text = ({ value, path }: TextComponentProps) => {
    if (!value) {
        return null;
    }

    return (
        <div
            className={'default typo-normal'}
            data-portal-component-type={ComponentType.Text}
            data-portal-component={path}
            data-th-remove="tag"
        >
            <ParsedHtml content={value} />
        </div>
    );
};
