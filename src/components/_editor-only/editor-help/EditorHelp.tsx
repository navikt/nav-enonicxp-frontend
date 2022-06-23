import React from 'react';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { StaticImage } from '../../_common/image/StaticImage';
import { classNames } from '../../../utils/classnames';
import { BodyShort } from '@navikt/ds-react';
import helpIcon from '/public/gfx/help.svg';
import errorIcon from '/public/gfx/error.svg';
import lightBulb from '/public/gfx/lightbulb.svg';
import arrowUp from '/public/gfx/arrowUp.svg';
import arrowDown from '/public/gfx/arrowDown.svg';

import style from './EditorHelp.module.scss';

const imagePath = {
    info: lightBulb,
    error: errorIcon,
    help: helpIcon,
    arrowUp,
    arrowDown,
};

type Props = {
    text: string;
    type?: 'info' | 'error' | 'help' | 'arrowUp' | 'arrowDown';
};

export const EditorHelp = ({ text, type = 'help' }: Props) => {
    const { pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    if (editorView !== 'edit') {
        return null;
    }

    return (
        <div className={style.editorHelp}>
            <StaticImage
                imageData={imagePath[type]}
                alt={''}
                className={classNames(style.icon, style[type])}
            />
            <BodyShort spacing={false} size="small" className={style.content}>
                {text}
            </BodyShort>
        </div>
    );
};
