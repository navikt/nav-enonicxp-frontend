import React from 'react';

import { Title, BodyLong } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';

export const CallingCosts = () => {
    const { language } = usePageConfig();

    const getContactTranslations = translator('contactPoint', language);

    const informationText = getContactTranslations('information');

    return (
        <>
            <Title level={2} size="s">
                {informationText['callCostTitle']}
            </Title>
            <BodyLong>{informationText['callCostIngress']}</BodyLong>
        </>
    );
};
