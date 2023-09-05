import React from 'react';
import { DuplicateIdsWarning } from 'components/_editor-only/duplicate-ids-warning/DuplicateIdsWarning';

import style from './EditorGlobalWarnings.module.scss';

export const EDITOR_GLOBAL_WARNINGS_CONTAINER_ID = 'global-warnings';

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
