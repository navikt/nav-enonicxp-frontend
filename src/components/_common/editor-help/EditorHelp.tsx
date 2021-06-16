import React from 'react';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { PublicImage } from '../image/PublicImage';
import { BEM } from '../../../utils/classnames';
import { Undertekst } from 'nav-frontend-typografi';
import './EditorHelp.less';

const bem = BEM('editor-help');

type Props = {
    helpText: string;
};

export const EditorHelp = ({ helpText }: Props) => {
    const { pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    if (editorView !== 'edit') {
        return null;
    }

    return (
        <div className={bem()}>
            <PublicImage
                imagePath={'/gfx/help.svg'}
                alt={''}
                className={bem('icon')}
            />
            <Undertekst className={bem('content')}>{helpText}</Undertekst>
        </div>
    );
};
