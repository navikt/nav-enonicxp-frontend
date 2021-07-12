import React from 'react';
import { formatAddress, normalizeReceptionAsArray } from '../utils';

import { formatDate } from 'utils/datetime';
import { translator, Language } from 'translations';
import {
    AudienceReception,
    OpeningHoursProps,
} from '../../../../../types/content-props/office-information-props';
import { Title, BodyShort } from '@navikt/ds-react';
import { MetaOpeningHours, OpeningHours } from './OpeningHours';
import { BEM } from '../../../../../utils/classnames';
import './Reception.less';

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
): FormattedAudienceReception => {
    // filter regular and exceptions for opening hour then introduce formatting for display
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

type ReceptionType = AudienceReception[] | AudienceReception | undefined;

interface Props {
    receptions: ReceptionType;
    language: Language;
}

const Reception = (props: Props) => {
    const getLabel = translator('officeInformation', props.language);
    const bem = BEM('publikumsmottak');

    if (!props.receptions) {
        return null;
    }

    const receptionArray = normalizeReceptionAsArray(props.receptions);

    return (
        <div className={bem()}>
            <Title level={2} size="m" className={bem('header')}>
                Publikumsmottak
            </Title>
            {receptionArray.map((rec: AudienceReception) => {
                const reception = formatAudienceReception(rec);
                return (
                    <div key={rec.id}>
                        <Title level={3} size="s">
                            {reception.place}
                        </Title>
                        <BodyShort>{reception.address}</BodyShort>
                        {/* exceptions in opening hours */}
                        {reception.openingHoursExceptions.length > 0 && (
                            <>
                                <Title level={4} size="s">
                                    Spesielle åpningstider
                                </Title>
                                <MetaOpeningHours
                                    openingHours={
                                        reception.openingHoursExceptions
                                    }
                                    metaKey="meta-exceptions"
                                />
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
                                <Title level={4} size="s">
                                    Åpningstider
                                </Title>
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

export default Reception;
