import React from 'react';
import { formatAddress, normalizeReceptionAsArray } from '../utils';
import { formatDate } from 'utils/datetime';
import { translator, Language } from 'translations';
import {
    AudienceReception,
    OpeningHoursProps,
} from 'types/content-props/office-information-props';
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
): FormattedAudienceReception => {
    // filter regular and exceptions for opening hour then introduce formatting for display
    const aapningstider = audienceReception.aapningstider.reduce(
        (acc, elem) => {
            if (elem.dato) {
                const isoDate = elem.dato;
                const dato = formatDate({ datetime: elem.dato, language });

                acc.exceptions.push({
                    ...elem,
                    isoDate,
                    dato,
                });
            } else {
                acc.regular.push(elem);
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

type ReceptionType = AudienceReception[] | AudienceReception | undefined;

interface Props {
    receptions: ReceptionType;
    language: Language;
}

export const Reception = (props: Props) => {
    if (!props.receptions) {
        return null;
    }

    const getLabel = translator('officeInformation', props.language);
    const receptionArray = normalizeReceptionAsArray(props.receptions);

    return (
        <div className={style.publikumsmottak}>
            <Heading level="2" size="medium" className={style.header}>
                Publikumsmottak
            </Heading>
            {receptionArray.map((rec: AudienceReception) => {
                const reception = formatAudienceReception(rec);
                return (
                    <div key={rec.id}>
                        <Heading level="3" size="small">
                            {reception.place}
                        </Heading>
                        <BodyShort>{reception.address}</BodyShort>
                        {/* exceptions in opening hours */}
                        {reception.openingHoursExceptions.length > 0 && (
                            <>
                                <Heading level="4" size="small">
                                    Spesielle åpningstider
                                </Heading>
                                <OpeningHours
                                    openingHours={
                                        reception.openingHoursExceptions
                                    }
                                    closedLabel={getLabel('closed')}
                                    metaKey="exception"
                                />
                            </>
                        )}

                        {/* opening hours */}
                        {reception.openingHours.length > 0 && (
                            <>
                                <Heading level="4" size="small">
                                    Åpningstider
                                </Heading>
                                <OpeningHours
                                    openingHours={reception.openingHours}
                                    closedLabel={getLabel('closed')}
                                    metaKey="standard"
                                />
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
