import React from 'react';
import { adminOrigin, editorPathPrefix } from 'utils/urls';
import { LenkeInline } from '../../_common/lenke/LenkeInline';
import { EditorLinkWrapper } from '../editor-link-wrapper/EditorLinkWrapper';

import style from './CustomSelectorUsageLink.module.scss';

export type CustomSelectorUsageData = {
    name: string;
    path: string;
    editorPath?: string;
    id: string;
};

export const CustomSelectorUsageLink = ({
    id,
    name,
    path,
    editorPath,
}: CustomSelectorUsageData) => {
    const href = editorPath || `${adminOrigin}${editorPathPrefix}/${id}`;

    return (
        <div className={style.usageLink} key={id}>
            {`${name} - `}
            <EditorLinkWrapper>
                <LenkeInline href={href} target={'_blank'}>
                    {path}
                </LenkeInline>
            </EditorLinkWrapper>
        </div>
    );
};
