import React, { useState } from 'react';
import { BodyLong, Tabs } from '@navikt/ds-react';
import { AudienceReception } from '../../../../types/content-props/office-details-props';

import { SingleReception } from './SingleReception';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

import styles from './Reception.module.scss';
import { forceArray } from 'utils/arrays';

interface LocationsProps {
    receptions: AudienceReception[] | AudienceReception;
}

export const Reception = ({ receptions }: LocationsProps) => {
    const { language } = usePageConfig();
    const receptionArray = forceArray(receptions);
    const getOfficeTranslations = translator('office', language);

    const getLocation = (reception: AudienceReception) => {
        if (!reception) {
            return '(Ukjent sted)';
        }
        return (
            reception.stedsbeskrivelse ||
            reception.besoeksadresse.poststed ||
            '(Ukjent sted)'
        );
    };

    const firstLocation = getLocation(receptionArray[0]);
    const [state, setState] = useState(firstLocation);

    if (!receptionArray || receptionArray.length === 0) {
        return null;
    }

    if (receptionArray.length === 1) {
        return <SingleReception {...receptionArray[0]} />;
    }

    return (
        <>
            <BodyLong>{getOfficeTranslations('chooseBetweenOffices')}</BodyLong>
            <Tabs
                value={state}
                onChange={setState}
                className={styles.officeTabs}
            >
                <Tabs.List>
                    {receptionArray.map((loc: AudienceReception, index) => {
                        const locationLabel = getLocation(loc);
                        return (
                            <Tabs.Tab
                                key={index}
                                value={locationLabel}
                                label={locationLabel}
                            />
                        );
                    })}
                </Tabs.List>
                {receptionArray.map((loc: AudienceReception, index) => {
                    const locationLabel = getLocation(loc);
                    return (
                        <Tabs.Panel
                            key={index}
                            value={locationLabel}
                            className={styles.singleTab}
                        >
                            <SingleReception {...loc} />
                        </Tabs.Panel>
                    );
                })}
            </Tabs>
        </>
    );
};
