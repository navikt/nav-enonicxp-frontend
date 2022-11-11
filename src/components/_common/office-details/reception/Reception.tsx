import React from 'react';
import { useState } from 'react';
import { Tabs } from '@navikt/ds-react';
import { formatAddress, normalizeReceptionAsArray } from '../utils';
import { formatDate } from 'utils/datetime';
import { translator, Language } from 'translations';
import {
    AudienceReception,
    OpeningHoursProps,
} from '../../../../types/content-props/office-information-props';
import { Heading, BodyShort } from '@navikt/ds-react';
import { MetaOpeningHours, OpeningHours } from './OpeningHours';
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
    console.log(audienceReception);

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
    console.log(props);

    const getLabel = translator('officeInformation', props.language);
    const receptionArray = normalizeReceptionAsArray(props.receptions);
    const displayAsTable = receptionArray.length > 1;

    const Location = (props: AudienceReception) => {
        console.log(props);
        const { address, openingHours, openingHoursExceptions } =
            formatAudienceReception(props);
        return (
            <>
                <BodyShort>{address}</BodyShort>

                {/* opening hours */}
                {openingHours.length > 0 && (
                    <>
                        <Heading level="4" size="small">
                            Åpningstider
                        </Heading>
                        <OpeningHours
                            openingHours={openingHours}
                            closedLabel={getLabel('closed')}
                            metaKey="standard"
                        />
                    </>
                )}
                {/* exceptions in opening hours */}
                {openingHoursExceptions.length > 0 && (
                    <>
                        <Heading level="4" size="small">
                            Spesielle åpningstider
                        </Heading>
                        {/* <MetaOpeningHours
                            openingHours={openingHoursExceptions}
                            metaKey="meta-exceptions"
                        /> */}
                        <OpeningHours
                            openingHours={openingHoursExceptions}
                            closedLabel={getLabel('closed')}
                            metaKey="exception"
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
                        console.log(place);
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
