import React from 'react';
import { LenkepanelListe } from '../_common/lenkepanel-liste/LenkepanelListe';
import { PageData } from 'types/content-types/_schema';
import { GlobalPageSchema } from 'types/content-types/_schema';
import { ContentType } from 'types/content-types/_schema';
import { LinkPanelsMock } from './LinkPanelsMock';

export const LinkPanels = (props: GlobalPageSchema) => {
    const type = props.__typename;
    const data =
        type === ContentType.TemplatePage
            ? (LinkPanelsMock as PageData)
            : props.data;

    const panelsHeading = data?.panelsHeading;
    const panelItems = data?.panelItems;

    return panelItems?.length > 0 ? (
        <LenkepanelListe title={panelsHeading} items={panelItems} {...props} />
    ) : null;
};
