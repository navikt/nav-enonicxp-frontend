import React from 'react';
import { TextComponentProps } from 'types/component-props/_component-common';
import { ComponentEditorProps } from 'components/ComponentMapper';

type Props = {
    textProps: TextComponentProps;
    editorProps?: ComponentEditorProps;
};

export const TextComponentXp = ({ textProps, editorProps }: Props) => {
    const { text } = textProps;

    if (!text) {
        if (editorProps) {
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
