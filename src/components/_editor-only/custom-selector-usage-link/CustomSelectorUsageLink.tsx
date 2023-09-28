import React from 'react';
import { LenkeInline } from '../../_common/lenke/LenkeInline';
import { EditorLinkWrapper } from '../editor-link-wrapper/EditorLinkWrapper';

import style from './CustomSelectorUsageLink.module.scss';

export type CustomSelectorUsageData = {
    name: string;
    path: string;
    editorPath: string;
    id: string;
};

export const CustomSelectorUsageLink = ({
    id,
    name,
    path,
    editorPath,
}: CustomSelectorUsageData) => {
    return (
        <div className={style.usageLink} key={id}>
            {`${name} - `}
            <EditorLinkWrapper>
                <LenkeInline href={editorPath} target={'_blank'}>
                    {path}
                </LenkeInline>
            </EditorLinkWrapper>
        </div>
    );
};
