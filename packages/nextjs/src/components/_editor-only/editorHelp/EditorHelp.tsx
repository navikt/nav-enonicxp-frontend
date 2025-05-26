import React, { useId } from 'react';
import { BodyShort } from '@navikt/ds-react';
import { usePageContentProps } from 'store/pageContext';
import { StaticImage } from 'components/_common/image/StaticImage';
import { classNames } from 'utils/classnames';
import { EditorLinkWrapper } from 'components/_editor-only/editorLinkWrapper/EditorLinkWrapper';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { RenderToEditorGlobalWarnings } from 'components/_editor-only/global-warnings/EditorGlobalWarnings';

import helpIcon from '/public/gfx/help.svg';
import errorIcon from '/public/gfx/error.svg';
import lightBulb from '/public/gfx/lightbulb.svg';
import arrowUp from '/public/gfx/arrowUp.svg';
import arrowDown from '/public/gfx/arrowDown.svg';

// eslint does not understand bracket notation
// eslint-disable-next-line css-modules/no-unused-class
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
    globalWarningText?: string;
    type?: 'info' | 'error' | 'help' | 'arrowUp' | 'arrowDown';
};

export const EditorHelp = ({ text, globalWarningText, type = 'help' }: Props) => {
    const { editorView } = usePageContentProps();

    const id = useId();

    if (!editorView) {
        return null;
    }

    // Show errors in all editor views. Info/help should only be shown in the edit-view
    // as we want the other views to be as similar to the public view as possible
    if (editorView !== 'edit' && type !== 'error') {
        return null;
    }

    return (
        <div className={style.editorHelp} id={id}>
            <StaticImage
                imageData={imagePath[type]}
                alt={''}
                className={classNames(style.icon, style[type])}
            />
            <BodyShort
                spacing={false}
                size={'small'}
                className={classNames(style.content, style[type])}
            >
                {text}
            </BodyShort>
            {globalWarningText && (
                <RenderToEditorGlobalWarnings>
                    <span>{globalWarningText}</span>
                    <EditorLinkWrapper>
                        <LenkeInline href={`#${id}`}>{'[Til feilen]'}</LenkeInline>
                    </EditorLinkWrapper>
                </RenderToEditorGlobalWarnings>
            )}
        </div>
    );
};
