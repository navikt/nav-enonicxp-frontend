import React from 'react';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { PublicImage } from '../image/PublicImage';
import { BEM, classNames } from '../../../utils/classnames';
import { Undertekst } from 'nav-frontend-typografi';
import './EditorHelp.less';

const bem = BEM('editor-help');

const imagePath = {
    info: '/gfx/help.svg',
    error: '/gfx/error.svg',
};

type Props = {
    text: string;
    type?: 'info' | 'error';
};

export const EditorHelp = ({ text, type = 'info' }: Props) => {
    const { pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    if (editorView !== 'edit') {
        return null;
    }

    return (
        <div className={bem()}>
            <PublicImage
                imagePath={imagePath[type]}
                alt={''}
                className={classNames(bem('icon'), bem('icon', type))}
            />
            <Undertekst className={bem('content')}>{text}</Undertekst>
        </div>
    );
};
