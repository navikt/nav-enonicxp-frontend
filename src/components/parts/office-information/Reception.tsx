import React from 'react';
import { formatAddress } from './utils';
import { formatDate } from 'utils/datetime';
import { translator, Language } from 'translations';
import {
    AudienceReception,
    OpeningHours,
} from '../../../types/content-props/office-information-props';

interface FormattedOpeningHours extends OpeningHours {
    meta: string;
}

interface FormattedAudienceReception {
    address: string;
    place: string;
    openingHoursExceptions: FormattedOpeningHours[];
    openingHours: FormattedOpeningHours[];
}

const formatMetaOpeningHours = (el: OpeningHours) => {
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

const getOpeningHours = (
    openingHours: OpeningHours[],
    closedLabel: string,
    metaKey: string
) => {
    return openingHours.map((opening, ix) => {
        // TODO: check why stengt is a string?
        const compKey = `${metaKey}-${ix}`;
        return (
            <tr key={compKey}>
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

const getMetaOpeningHours = (openingHours: OpeningHours[], metaKey: string) => {
    return openingHours.map((opening, ix) => {
        const hours = !opening.stengt ? (
            <>
                <time itemProp="opens" data-th-datetime="${opening.fra}">
                    {opening.fra}
                </time>
                <time itemProp="closes" data-th-datetime="${opening.til}">
                    {opening.til}
                </time>
            </>
        ) : null;
        const compKey = `${metaKey}-${ix}`;
        return (
            <li
                key={compKey}
                itemProp="specialOpeningHoursSpecification"
                itemType="http://schema.org/OpeningHoursSpecification"
            >
                <time itemProp="validFrom" dateTime="${opening.isoDate}">
                    {opening.dato}
                </time>
                <time itemProp="validThrough" dateTime="${opening.isoDate}">
                    {opening.dato}
                </time>
                {hours}
            </li>
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
            getLabel('closed'),
            'standard'
        );

        const openingHoursExceptions = getOpeningHours(
            reception.openingHoursExceptions,
            getLabel('closed'),
            'exception'
        );

        const metaOpeningHoursExceptions = getMetaOpeningHours(
            reception.openingHoursExceptions,
            'meta-exceptions'
        );

        return (
            <div key={rec.id} itemProp="http://schema.org/localbusiness">
                <h2 itemProp="name">{reception.place}</h2>
                <p></p>
                <p
                    className="p-street-address"
                    itemProp="address"
                    itemType="http://schema.org/postaladdress"
                >
                    {reception.address}
                </p>
                {/* exceptions in opening hours */}
                {openingHoursExceptions.length > 0 && (
                    <div>
                        <h5>Spesielle åpningstider</h5>
                        <ul className="hidden">{metaOpeningHoursExceptions}</ul>
                        <table>
                            <tbody>{openingHoursExceptions}</tbody>
                        </table>
                    </div>
                )}

                {/* opening hours */}
                {openingHoursDays.length > 0 && (
                    <div>
                        <h5>Åpningstider</h5>
                        {reception.openingHours.map((oh, ix) => {
                            return (
                                oh.stengt !== 'true' && (
                                    <meta
                                        itemProp="openingHours"
                                        key={`oh-meta-${ix}`}
                                        content={oh.meta}
                                    />
                                )
                            );
                        })}
                        <table>
                            <tbody>{openingHoursDays}</tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    });

    return <>{receptions}</>;
};

export default Reception;
