import React from 'react';
import { FragmentUsageData } from './FragmentUsageCheck';
import { editorPathPrefix } from '../../../../utils/urls';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';
import { EditorLinkWrapper } from '../../../_editor-only/editor-link-wrapper/EditorLinkWrapper';

import style from './FragmentUsageLink.module.scss';

export const FragmentUsageLink = ({ id, name, path }: FragmentUsageData) => {
    const editorUrl = `${editorPathPrefix}/${id}`;
    return (
        <div className={style.fragmentUsageLink} key={id}>
            {`${name} - `}
            <EditorLinkWrapper>
                <LenkeInline href={editorUrl} target={'_blank'}>
                    {path}
                </LenkeInline>
            </EditorLinkWrapper>
        </div>
    );
};
