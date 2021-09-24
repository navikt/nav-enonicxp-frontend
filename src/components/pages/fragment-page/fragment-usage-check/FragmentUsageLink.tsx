import React from 'react';
import { FragmentUsageData } from './FragmentUsageCheck';
import { editorPathPrefix } from '../../../../utils/urls';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';
import { EditorLinkWrapper } from '../../../_common/editor-utils/editor-link-wrapper/EditorLinkWrapper';

export const FragmentUsageLink = ({ id, name, path }: FragmentUsageData) => {
    const editorUrl = `${editorPathPrefix}/${id}`;
    return (
        <div className={'fragment-usage-link'} key={id}>
            {`${name} - `}
            <EditorLinkWrapper>
                <LenkeInline href={editorUrl} target={'_blank'}>
                    {path}
                </LenkeInline>
            </EditorLinkWrapper>
        </div>
    );
};
