import React from 'react';
import { LenkepanelListe } from '../../../_common/lenkepanel-liste/LenkepanelListe';
import { SectionPageProps } from '../../../../types/content-props/section-page-props';

export const LinkPanelsLegacyPart = (props: SectionPageProps) => {
    const { panelsHeading, panelItems } = props.data;

    return panelItems?.length > 0 ? (
        <LenkepanelListe title={panelsHeading} items={panelItems} {...props} />
    ) : null;
};
