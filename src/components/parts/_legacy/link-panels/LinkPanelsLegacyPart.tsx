import React from 'react';
import { LenkepanelListe } from 'components/_common/lenkepanelListe/LenkepanelListe';
import { ContentProps, ContentType } from 'types/content-props/_content-common';

export const LinkPanelsLegacyPart = (props: ContentProps) => {
    if (props.type !== ContentType.SectionPage) {
        return null;
    }

    const { panelsHeading, panelItems } = props.data;
    if (!panelItems || panelItems.length === 0) {
        return null;
    }

    return <LenkepanelListe title={panelsHeading} items={panelItems} {...props} />;
};
