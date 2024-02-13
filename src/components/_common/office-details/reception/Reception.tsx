import React, { useState } from 'react';
import { BodyLong, Tabs } from '@navikt/ds-react';
import { AudienceReception } from './utils/types';
import { SingleReception } from './SingleReception';
import { translator } from './utils/translations';

import styles from './Reception.module.scss';

interface LocationsProps {
    receptions: AudienceReception[];
    language: string;
}

const validateLanguage = (lang: string): 'no' | 'nn' | 'en' => {
    return ['no', 'nn', 'en'].includes(lang)
        ? (lang as 'no' | 'nn' | 'en')
        : 'no';
};

export const Reception = ({ receptions, language }: LocationsProps) => {
    const languageValidated = validateLanguage(language);

    const getOfficeTranslations = translator('office', languageValidated);

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

    const getIdFromLabel = (label: string) => {
        return label.replace(/\s/g, '-').toLowerCase();
    };

    const firstLocation = getLocation(receptions[0]);
    const [state, setState] = useState(getIdFromLabel(firstLocation));

    if (!receptions || receptions.length === 0) {
        return null;
    }

    if (receptions.length === 1) {
        return (
            <div className={styles.singleTab}>
                <SingleReception
                    {...receptions[0]}
                    language={languageValidated}
                />
            </div>
        );
    }

    return (
        <>
            <BodyLong className={styles.chooseBetweenOffices}>
                {getOfficeTranslations('chooseBetweenOffices')}
            </BodyLong>
            <Tabs
                value={state}
                onChange={setState}
                className={styles.officeTabs}
            >
                <Tabs.List>
                    {receptions.map((loc: AudienceReception, index) => {
                        const locationLabel = getLocation(loc);
                        return (
                            <Tabs.Tab
                                key={index}
                                value={getIdFromLabel(locationLabel)}
                                label={locationLabel}
                            />
                        );
                    })}
                </Tabs.List>
                {receptions.map((loc: AudienceReception, index) => {
                    const locationLabel = getLocation(loc);
                    return (
                        <Tabs.Panel
                            key={index}
                            value={getIdFromLabel(locationLabel)}
                            className={styles.singleTab}
                        >
                            <SingleReception
                                {...loc}
                                language={languageValidated}
                            />
                        </Tabs.Panel>
                    );
                })}
            </Tabs>
        </>
    );
};
