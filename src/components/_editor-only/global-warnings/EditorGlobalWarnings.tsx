import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { DuplicateIdsWarning } from 'components/_editor-only/duplicate-ids-warning/DuplicateIdsWarning';

import style from './EditorGlobalWarnings.module.scss';

const EDITOR_GLOBAL_WARNINGS_CONTAINER_ID = 'global-warnings';

export const RenderToEditorGlobalWarnings = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    if (isFirstRender) {
        return null;
    }

    const element = document.getElementById(
        EDITOR_GLOBAL_WARNINGS_CONTAINER_ID
    );
    if (!element) {
        return null;
    }

    return createPortal(children, element);
};

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
