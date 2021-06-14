import { UndertekstBold } from 'nav-frontend-typografi';
import React from 'react';
import { usePageConfig } from '../../../store/hooks/usePageConfig';

type Props = {
    children: React.ReactNode;
};

export const EditorHelp = ({ children }: Props) => {
    const { pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    if (editorView !== 'edit') {
        return null;
    }

    return;
    <UndertekstBold>{children}</UndertekstBold>;
};
