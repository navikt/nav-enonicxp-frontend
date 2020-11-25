import React from 'react';
import { LenkepanelListe } from './lenkepanel-liste/LenkepanelListe';
import { GlobalPageProps } from 'types/content-props/_content-common';
import './LinkPanels.less';

export const LinkPanels = (props: GlobalPageProps) => {
    const { panelsHeading, panelItems } = props.data;

    return (
        <LenkepanelListe title={panelsHeading} items={panelItems} {...props} />
    );
};
