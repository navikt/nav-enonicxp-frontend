import React from 'react';
import { LenkeInline } from '../../../../_common/lenke/LenkeInline';
import { adminOrigin, editorPathPrefix } from '../../../../../utils/urls';

const editorUrl = `${adminOrigin}${editorPathPrefix}`;

type Props = {
    id: string;
};

export const SiteInfoEditorLink = ({ id }: Props) => {
    return (
        <LenkeInline
            href={`${editorUrl}/${id}`}
            target={'_blank'}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            {'[Åpne i editor]'}
        </LenkeInline>
    );
};
