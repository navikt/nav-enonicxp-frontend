import React from 'react';
import { Knapp } from 'components/_common/knapp/Knapp';
import { EditorLinkWrapper } from 'components/_editor-only/editorLinkWrapper/EditorLinkWrapper';
import style from './GVButton.module.scss';

export const GVButton = (props: React.ComponentProps<typeof Knapp>) => (
    <EditorLinkWrapper>
        <Knapp {...props} size={'small'} className={style.button}>
            {props.children}
        </Knapp>
    </EditorLinkWrapper>
);
