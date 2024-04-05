import React, { useState } from 'react';
import { BodyLong, Tabs } from '@navikt/ds-react';
import { AudienceReception } from 'types/content-props/office-details-props';
import { forceArray } from 'utils/arrays';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { SingleReception } from './SingleReception';

import style from './Reception.module.scss';

type Props = {
    receptions: AudienceReception[] | AudienceReception;
    officeType: string;
};

export const Reception = ({ receptions, officeType }: Props) => {
    const { language } = usePageContentProps();
    const receptionArray = forceArray(receptions);
    const getOfficeTranslations = translator('office', language);

    const getLocation = (reception: AudienceReception) => {
        if (!reception) {
            return '(Ukjent sted)';
        }
        return reception.stedsbeskrivelse || reception.besoeksadresse?.poststed || '(Ukjent sted)';
    };

    const getIdFromLabel = (label: string) => {
        return label.replace(/\s/g, '-').toLowerCase();
    };

    const firstLocation = getLocation(receptionArray[0]);
    const [state, setState] = useState(getIdFromLabel(firstLocation));

    if (!receptionArray || receptionArray.length === 0) {
        return null;
    }

    if (receptionArray.length === 1) {
        return (
            <div className={style.singleTab}>
                <SingleReception {...receptionArray[0]} officeType={officeType} />
            </div>
        );
    }

    return (
        <>
            <BodyLong className={style.chooseBetweenOffices}>
                {getOfficeTranslations('chooseBetweenOffices')}
            </BodyLong>
            <Tabs value={state} onChange={setState} className={style.officeTabs}>
                <Tabs.List>
                    {receptionArray.map((loc: AudienceReception, index) => {
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
                {receptionArray.map((loc: AudienceReception, index) => {
                    const locationLabel = getLocation(loc);
                    return (
                        <Tabs.Panel
                            key={index}
                            value={getIdFromLabel(locationLabel)}
                            className={style.singleTab}
                        >
                            <SingleReception {...loc} />
                        </Tabs.Panel>
                    );
                })}
            </Tabs>
        </>
    );
};
