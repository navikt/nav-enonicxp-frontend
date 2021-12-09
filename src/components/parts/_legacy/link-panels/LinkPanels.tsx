import React from 'react';
import { LenkepanelListe } from '../../../_common/lenkepanel-liste/LenkepanelListe';
import { ContentProps } from 'types/content-props/_content-common';

export const LinkPanels = (props: ContentProps) => {
    const { panelsHeading, panelItems } = props.data;

    return panelItems?.length > 0 ? (
        <LenkepanelListe title={panelsHeading} items={panelItems} {...props} />
    ) : null;
};
