import React from 'react';
import { Button } from 'components/_common/button/Button';
import { EditorLinkWrapper } from 'components/_editor-only/editorLinkWrapper/EditorLinkWrapper';
import style from './GVButton.module.scss';

export const GVButton = (props: React.ComponentProps<typeof Button>) => (
    <EditorLinkWrapper>
        <Button {...props} size={'small'} className={style.button}>
            {props.children}
        </Button>
    </EditorLinkWrapper>
);
