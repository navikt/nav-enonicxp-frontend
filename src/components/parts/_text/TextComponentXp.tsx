import React from 'react';
import { ComponentType, TextComponentProps } from 'types/component-props/_component-common';

type Props = {
    textProps: TextComponentProps;
    editMode?: boolean;
};

export const TextComponentXp = ({ textProps, editMode }: Props) => {
    const { text, path } = textProps;

    const editorProps = editMode
        ? {
              'data-portal-component-type': ComponentType.Text,
              'data-portal-component': path,
          }
        : undefined;

    if (!text) {
        if (editMode) {
            return <div {...editorProps}>{'Tom tekst-komponent, klikk for å redigere'}</div>;
        }
        return null;
    }

    return (
        <div className={'typo-normal'} {...editorProps}>
            {text}
        </div>
    );
};
