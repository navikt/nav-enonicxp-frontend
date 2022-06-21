import React from 'react';
import { LoggedInCardTypeProps } from '../../../../types/component-props/parts/loggedin-card';
import { EditorHelp } from '../../../_editor-only/editor-help/EditorHelp';

type Props = LoggedInCardTypeProps['meldekort'];

export const LoggedinCardMeldekort = ({ link }: Props) => {
    return <EditorHelp text={'Denne komponenten er ikke klar til bruk'} />;
};
