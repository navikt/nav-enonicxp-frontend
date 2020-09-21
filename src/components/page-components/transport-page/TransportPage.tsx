import React from 'react';
import { TransportPageProps } from '../../../types/content-types/transport-page-props';
import { LenkepanelListe } from '../../part-components/lenkepanel-liste/LenkepanelListe';

export const TransportPage = ({
    displayName,
    data: { ingress, items },
}: TransportPageProps) => {
    return (
        <LenkepanelListe title={displayName} ingress={ingress} items={items} />
    );
};
