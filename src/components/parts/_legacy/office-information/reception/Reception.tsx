import React from 'react';
import { Heading, BodyShort } from '@navikt/ds-react';
import { formatDate } from 'utils/datetime';
import { translator, Language } from 'translations';
import {
    LegacyOfficeAudienceReception,
    LegacyOfficeOpeningHoursProps,
} from 'types/content-props/office-information-props';
import { forceArray } from 'utils/arrays';
import { officeDetailsFormatAddress } from 'components/pages/office-page/office-details/utils';
import { OpeningHours } from './OpeningHours';

import style from './Reception.module.scss';

type FormattedAudienceReception = {
    address: string;
    place: string;
    openingHoursExceptions: LegacyOfficeOpeningHoursProps[];
    openingHours: LegacyOfficeOpeningHoursProps[];
};

const dagArr: string[] = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag'];

const sortOpeningHours = (a: LegacyOfficeOpeningHoursProps, b: LegacyOfficeOpeningHoursProps) => {
    return (a.dag ? dagArr.indexOf(a.dag) : -1) - (b.dag ? dagArr.indexOf(b.dag) : -1);
};

const formatAudienceReception = (
    audienceReception: LegacyOfficeAudienceReception,
    language: string = 'no'
): FormattedAudienceReception => {
    // filter regular and exceptions for opening hour then introduce formatting for display
    const aapningstider = audienceReception.aapningstider.reduce<{
        regular: LegacyOfficeOpeningHoursProps[];
        exceptions: LegacyOfficeOpeningHoursProps[];
    }>(
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
        address: officeDetailsFormatAddress(audienceReception.besoeksadresse, true),
        place: audienceReception.stedsbeskrivelse || audienceReception.besoeksadresse.poststed,
        openingHoursExceptions: aapningstider.exceptions,
        openingHours: aapningstider.regular.sort(sortOpeningHours),
    };
};

type ReceptionType = LegacyOfficeAudienceReception[] | LegacyOfficeAudienceReception | undefined;

type Props = {
    receptions: ReceptionType;
    language: Language;
};

export const Reception = (props: Props) => {
    if (!props.receptions) {
        return null;
    }

    const getLabel = translator('officeInformation', props.language);
    const receptionArray = forceArray(props.receptions);

    return (
        <div className={style.publikumsmottak}>
            <Heading level="2" size="medium" className={style.header}>
                Publikumsmottak
            </Heading>
            {receptionArray.map((rec: LegacyOfficeAudienceReception) => {
                const reception = formatAudienceReception(rec);
                return (
                    <div key={rec.id}>
                        <Heading level="3" size="small">
                            {reception.place}
                        </Heading>
                        <BodyShort>{reception.address}</BodyShort>
                        {reception.openingHoursExceptions.length > 0 && (
                            <>
                                <Heading level="4" size="small">
                                    Spesielle åpningstider
                                </Heading>
                                <OpeningHours
                                    openingHours={reception.openingHoursExceptions}
                                    closedLabel={getLabel('closed')}
                                    metaKey="exception"
                                />
                            </>
                        )}
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
