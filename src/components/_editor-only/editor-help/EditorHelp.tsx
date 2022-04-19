import React from 'react';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { StaticImage } from '../../_common/image/StaticImage';
import { BEM, classNames } from '../../../utils/classnames';
import { BodyShort } from '@navikt/ds-react';

import infoIcon from '/public/gfx/help.svg';
import errorIcon from '/public/gfx/error.svg';

const bem = BEM('editor-help');

const imagePath = {
    info: infoIcon,
    error: errorIcon,
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
            <StaticImage
                imageData={imagePath[type]}
                alt={''}
                className={classNames(bem('icon'), bem('icon', type))}
            />
            <BodyShort spacing={false} size="small" className={bem('content')}>
                {text}
            </BodyShort>
        </div>
    );
};
