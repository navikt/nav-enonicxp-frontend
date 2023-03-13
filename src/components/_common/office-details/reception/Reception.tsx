import React, { useState } from 'react';
import { Tabs } from '@navikt/ds-react';
import { normalizeReceptionAsArray } from '../utils';
import { AudienceReception } from '../../../../types/content-props/office-details-props';

import { SingleReception } from './SingleReception';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

import styles from './Reception.module.scss';

interface LocationsProps {
    receptions: AudienceReception[];
}

export const Reception = ({ receptions }: LocationsProps) => {
    const { language } = usePageConfig();
    const receptionArray = normalizeReceptionAsArray(receptions);
    const getOfficeTranslations = translator('office', language);

    const getLocation = (reception: AudienceReception) => {
        return reception.stedsbeskrivelse || reception.besoeksadresse.poststed;
    };

    const firstLocation = getLocation(receptionArray[0]) || 'Ukjent sted';
    const [state, setState] = useState(firstLocation);

    if (!receptions) {
        return null;
    }

    if (receptionArray.length === 1) {
        return <SingleReception {...receptionArray[0]} />;
    }

    return (
        <>
            <div className={styles.chooseBetweenOffices}>
                {getOfficeTranslations('chooseBetweenOffices')}
            </div>
            <Tabs value={state} onChange={setState}>
                <Tabs.List>
                    {receptions.map((loc: AudienceReception, index) => {
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
                {receptions.map((loc: AudienceReception, index) => {
                    const locationLabel = getLocation(loc);
                    return (
                        <Tabs.Panel key={index} value={locationLabel}>
                            <SingleReception {...loc} />
                        </Tabs.Panel>
                    );
                })}
            </Tabs>
        </>
    );
};
