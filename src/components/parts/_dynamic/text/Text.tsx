import React from 'react';
import { ParsedHtml } from '../../../ParsedHtml';
import {
    ComponentType,
    TextComponentProps,
} from '../../../../types/component-props/_component-common';

type Props = {
    textProps: TextComponentProps;
    editMode?: boolean;
};

export const Text = ({ textProps, editMode }: Props) => {
    const { value, path } = textProps;
    if (!value) {
        return null;
    }

    const editorProps = editMode
        ? {
              'data-portal-component-type': ComponentType.Text,
              'data-portal-component': path,
          }
        : undefined;

    return (
        <div className={'typo-normal'} {...editorProps}>
            <ParsedHtml content={value} />
        </div>
    );
};
