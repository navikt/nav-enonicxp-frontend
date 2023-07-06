import React from 'react';
import { LenkepanelListe } from '../../../_common/lenkepanel-liste/LenkepanelListe';
import { SectionPageProps } from 'types/content-props/section-page-props';

export const LinkPanelsLegacyPart = (props: SectionPageProps) => {
    const { panelsHeading, panelItems } = props.data;
    if (!panelItems || panelItems.length === 0) {
        return null;
    }

    return (
        <LenkepanelListe title={panelsHeading} items={panelItems} {...props} />
    );
};
