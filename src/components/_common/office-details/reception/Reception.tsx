import React from 'react';
import { useState } from 'react';
import { Tabs } from '@navikt/ds-react';
import { formatAddress, normalizeReceptionAsArray } from '../utils';
import { formatDate } from 'utils/datetime';
import { translator, Language } from 'translations';
import {
    AudienceReception,
    OpeningHours as OpeningHoursProps,
} from '../../../../types/content-props/office-details-props';
import { Heading, BodyShort } from '@navikt/ds-react';
import { OpeningHours } from './OpeningHours';

import style from './Reception.module.scss';

interface FormattedOpeningHours extends OpeningHoursProps {
    meta: string;
}

interface FormattedAudienceReception {
    address: string;
    place: string;
    openingHoursExceptions: FormattedOpeningHours[];
    openingHours: FormattedOpeningHours[];
}

const formatMetaOpeningHours = (el: OpeningHoursProps) => {
    const days: { [key: string]: string } = {
        Mandag: 'Mo',
        Tirsdag: 'Tu',
        Onsdag: 'We',
        Torsdag: 'Th',
        Fredag: 'Fr',
    };
    const day = days[el.dag];
    return `${day} ${el.fra}-${el.til}`;
};

const sortOpeningHours = (a: OpeningHoursProps, b: OpeningHoursProps) => {
    const dagArr: string[] = [
        'Mandag',
        'Tirsdag',
        'Onsdag',
        'Torsdag',
        'Fredag',
    ];
    return dagArr.indexOf(a.dag) - dagArr.indexOf(b.dag);
};

const formatAudienceReception = (
    audienceReception: AudienceReception,
    language: string = 'no'
): FormattedAudienceReception | null => {
    // filter regular and exceptions for opening hour then introduce formatting for display
    if (!audienceReception) {
        return null;
    }

    const aapningstider = audienceReception.aapningstider.reduce(
        (acc, elem) => {
            if (elem.dato) {
                const isoDate = elem.dato;
                const dato = formatDate(elem.dato, language);

                acc.exceptions.push({
                    ...elem,
                    isoDate,
                    dato,
                });
            } else {
                acc.regular.push({
                    ...elem,
                    meta: formatMetaOpeningHours(elem),
                });
            }
            return acc;
        },
        {
            regular: [],
            exceptions: [],
        }
    );

    return {
        address: formatAddress(audienceReception.besoeksadresse, true),
        place:
            audienceReception.stedsbeskrivelse ||
            audienceReception.besoeksadresse.poststed,
        openingHoursExceptions: aapningstider.exceptions,
        openingHours: aapningstider.regular.sort(sortOpeningHours),
    };
};

interface LocationsProps {
    receptions: AudienceReception[];
    language: Language;
}

const Reception = (props: LocationsProps) => {
    if (!props.receptions) {
        return null;
    }

    const getLabel = translator('office', props.language);
    const receptionArray = normalizeReceptionAsArray(props.receptions);
    const displayAsTable = receptionArray.length > 1;

    const Location = (props: AudienceReception) => {
        const { address, openingHours, openingHoursExceptions } =
            formatAudienceReception(props);
        return (
            <>
                <Heading level="2" size="medium" spacing>
                    Adresse
                </Heading>
                <BodyShort className={style.address}>{address}</BodyShort>

                {/* opening hours */}
                {openingHours.length > 0 && (
                    <>
                        <Heading level="3" size="medium" spacing>
                            Åpningstider når du ikke har avtale
                        </Heading>
                        <OpeningHours
                            openingHours={openingHours}
                            closedLabel={getLabel('closed')}
                            appointmentOnlyLabel={getLabel('appointmentOnly')}
                            language={props.language}
                        />
                    </>
                )}
                {/* exceptions in opening hours */}
                {openingHoursExceptions.length > 0 && (
                    <>
                        <Heading level="3" size="medium" spacing>
                            {getLabel('specialOpeningHours')}
                        </Heading>
                        <OpeningHours
                            openingHours={openingHoursExceptions}
                            closedLabel={getLabel('closed')}
                            appointmentOnlyLabel={getLabel('appointmentOnly')}
                            language={props.language}
                        />
                    </>
                )}
            </>
        );
    };
    const LocationsTable = (props: LocationsProps) => {
        const { receptions } = props;

        const lokasjon =
            receptions[0]?.stedsbeskrivelse ||
            receptions[0]?.besoeksadresse.poststed;

        const [state, setState] = useState(lokasjon);

        if (!receptions) {
            return null;
        }

        return (
            <Tabs value={state} onChange={setState}>
                <Tabs.List>
                    {receptions.map((loc: AudienceReception, index) => {
                        const { place } = formatAudienceReception(loc);

                        return (
                            <Tabs.Tab key={index} value={place} label={place} />
                        );
                    })}
                </Tabs.List>
                {receptions.map((loc: AudienceReception, index) => {
                    const { place } = formatAudienceReception(loc);
                    return (
                        <Tabs.Panel key={index} value={place}>
                            <Location {...loc} />
                        </Tabs.Panel>
                    );
                })}
            </Tabs>
        );
    };

    return (
        <div className={style.publikumsmottak}>
            {displayAsTable ? (
                <LocationsTable {...props} />
            ) : (
                <Location {...receptionArray[0]} />
            )}
        </div>
    );
};

export default Reception;
