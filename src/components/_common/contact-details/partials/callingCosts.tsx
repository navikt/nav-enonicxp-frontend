import React from 'react';

import { Heading, BodyLong } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';

export const CallingCosts = () => {
    const { language } = usePageConfig();

    const getContactTranslations = translator('contactPoint', language);

    const informationText = getContactTranslations('information');

    return (
        <>
            <Heading level="2" size="small">
                {informationText['callCostTitle']}
            </Heading>
            <BodyLong>{informationText['callCostIngress']}</BodyLong>
        </>
    );
};
