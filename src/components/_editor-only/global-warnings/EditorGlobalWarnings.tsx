import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ContentProps } from 'types/content-props/_content-common';
import { DuplicateIdsWarning } from 'components/_editor-only/duplicate-ids-warning/DuplicateIdsWarning';
import { SamledeVarsler } from 'components/_editor-only/samlede-varsler/SamledeVarsler';
import style from './EditorGlobalWarnings.module.scss';

const EDITOR_GLOBAL_WARNINGS_CONTAINER_ID = 'global-warnings';

export const RenderToEditorGlobalWarnings = ({ children }: { children: React.ReactNode }) => {
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    if (isFirstRender) {
        return null;
    }

    const element = document.getElementById(EDITOR_GLOBAL_WARNINGS_CONTAINER_ID);
    if (!element) {
        return null;
    }

    return createPortal(children, element);
};

export const EditorGlobalWarnings = ({ content }: { content: ContentProps }) => {
    return (
        <>
            <div className={style.container} id={EDITOR_GLOBAL_WARNINGS_CONTAINER_ID}>
                <DuplicateIdsWarning />
            </div>
            <SamledeVarsler content={content} />
        </>
    );
};
