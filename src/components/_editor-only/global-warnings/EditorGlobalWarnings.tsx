import React from 'react';
import { createPortal } from 'react-dom';
import { DuplicateIdsWarning } from 'components/_editor-only/duplicate-ids-warning/DuplicateIdsWarning';

import style from './EditorGlobalWarnings.module.scss';

const EDITOR_GLOBAL_WARNINGS_CONTAINER_ID = 'global-warnings';

export const renderEditorGlobalWarning = (component: React.ReactNode) =>
    typeof document !== 'undefined' &&
    createPortal(
        <div>{component}</div>,
        document.getElementById(EDITOR_GLOBAL_WARNINGS_CONTAINER_ID)
    );

export const EditorGlobalWarnings = () => {
    return (
        <div
            className={style.container}
            id={EDITOR_GLOBAL_WARNINGS_CONTAINER_ID}
        >
            <DuplicateIdsWarning />
        </div>
    );
};
