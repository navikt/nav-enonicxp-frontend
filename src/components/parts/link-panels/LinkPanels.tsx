import React from 'react';
import { LenkepanelListe } from './lenkepanel-liste/LenkepanelListe';
import { PageData } from 'types/content-props/_content-common';
import { GlobalPageProps } from 'types/content-props/_content-common';
import { ContentType } from 'types/content-props/_content-common';
import { LinkPanelsMock } from './LinkPanelsMock';
import './LinkPanels.less';

export const LinkPanels = (props: GlobalPageProps) => {
    const type = props.__typename;
    const data =
        type === ContentType.TemplatePage
            ? (LinkPanelsMock as PageData)
            : props.data;

    const panelsHeading = data?.panelsHeading;
    const panelItems = data?.panelItems;

    return (
        <LenkepanelListe title={panelsHeading} items={panelItems} {...props} />
    );
};
