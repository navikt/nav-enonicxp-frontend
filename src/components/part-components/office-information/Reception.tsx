import React from 'react';
import {
    OpeningHours,
    AudienceReception,
} from 'types/content-types/office-information-props';
import { formatAddress } from './utils';
import { formatDate } from 'utils/datetime';
import { translator, Language } from 'translations';

interface FormattedAudienceReception {
    address: string;
    place: string;
    openingHoursExceptions: OpeningHours[];
    openingHours: OpeningHours[];
}

const formatMetaOpeningHours = (el: OpeningHours) => {
    let day: string;
    if (el.dag === 'Mandag') {
        day = 'Mo';
    } else if (el.dag === 'Tirsdag') {
        day = 'Tu';
    } else if (el.dag === 'Onsdag') {
        day = 'We';
    } else if (el.dag === 'Torsdag') {
        day = 'Th';
    } else if (el.dag === 'Fredag') {
        day = 'Fr';
    }
    const meta = `${day} ${el.fra}-${el.til}`;
    return { ...el, meta };
};

const sortOpeningHours = (a: OpeningHours, b: OpeningHours) => {
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

const getOpeningHours = (openingHours: OpeningHours[], closedLabel: string) => {
    return openingHours.map((opening, ix) => {
        // TODO: check why stengt is a string?
        return (
            <tr key={ix}>
                <td>{opening.dato}</td>
                <td>{opening.dag}</td>
                <td>
                    {opening.fra && opening.til
                        ? `${opening.fra} - ${opening.til}`
                        : ''}
                </td>
                <td>{opening.stengt === 'true' ? closedLabel : ''}</td>
                <td>{opening.kommentar}</td>
            </tr>
        );
    });
};

interface Props {
    receptions: AudienceReception[];
    language: Language;
}

const Reception = (props: Props) => {
    const getLabel = translator('officeInformation', props.language);

    const receptions = props.receptions.map((rec: AudienceReception) => {
        const reception = formatAudienceReception(rec);
        const openingHoursDays = getOpeningHours(
            reception.openingHours,
            getLabel('closed')
        );
        const openingHours =
            openingHoursDays.length > 0 ? (
                <div>
                    <h5>Åpningstider</h5>
                    <table>
                        <tbody>{openingHoursDays}</tbody>
                    </table>
                </div>
            ) : null;

        const openingHoursExceptions = getOpeningHours(
            reception.openingHoursExceptions,
            getLabel('closed')
        );

        const exceptions =
            openingHoursExceptions.length > 0 ? (
                <div>
                    <h5>Spesielle åpningstider</h5>

                    <table>
                        <tbody>{openingHoursExceptions}</tbody>
                    </table>
                </div>
            ) : null;
        return (
            <div itemProp="http://schema.org/localbusiness">
                <h2 itemProp="name">{reception.place}</h2>
                <p></p>
                <p
                    className="p-street-address"
                    itemProp="address"
                    itemType="http://schema.org/postaladdress"
                >
                    {reception.address}
                </p>
                {exceptions}
                {openingHours}
            </div>
        );
    });

    return <>{receptions}</>;
};

export default Reception;
