import React from 'react';
import { SiteInfoLink } from './SiteInfoLink';
import { adminOrigin, editorPathPrefix } from '../../../../../utils/urls';

const editorUrl = `${adminOrigin}${editorPathPrefix}`;

type Props = {
    id: string;
};

export const SiteInfoEditorLink = ({ id }: Props) => {
    return (
        <SiteInfoLink href={`${editorUrl}/${id}`}>
            {'[Åpne i editor]'}
        </SiteInfoLink>
    );
};
