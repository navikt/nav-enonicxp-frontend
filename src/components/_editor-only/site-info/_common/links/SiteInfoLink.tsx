import React from 'react';
import { adminOrigin, appOrigin, stripXpPathPrefix } from 'utils/urls';
import { xpEditorBasePathDefault } from 'components/_editor-only/utils/editor-urls';

import style from './SiteInfoLink.module.scss';

const editorUrlPrefix = `${adminOrigin}${xpEditorBasePathDefault}`;
const liveUrlPrefix = appOrigin;

type Props =
    | { target: 'editor'; id: String }
    | { target: 'live'; path: string; children: React.ReactNode };

export const SiteInfoLink = (props: Props) => {
    const { target } = props;

    return (
        <>
            {target === 'editor' && '['}
            <a
                href={
                    target === 'editor'
                        ? `${editorUrlPrefix}/${props.id}`
                        : `${liveUrlPrefix}${stripXpPathPrefix(props.path)}`
                }
                target={'_blank'}
                rel={'noreferrer'}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={
                    target === 'editor' ? style.editorLink : style.liveLink
                }
            >
                {target === 'editor' ? 'Åpne i editor' : props.children}
            </a>
            {target === 'editor' && ']'}
        </>
    );
};
