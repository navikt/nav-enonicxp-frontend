import React from 'react';
import { TransportPageSchema } from '../../../types/schemas/transport-page-schema';
import { LenkepanelListe } from '../../sub-components/lenkepanel-liste/LenkepanelListe';

export const TransportPage = ({
    data: { title, ingress, items },
}: TransportPageSchema) => {
    return <LenkepanelListe title={title} ingress={ingress} items={items} />;
};
