import React from 'react';
import { formatAddress } from './utils';
import { formatDate } from 'utils/datetime';
import { translator, Language } from 'translations';
import {
    AudienceReception,
    OpeningHours,
} from '../../../types/content-props/office-information-props';
import {
    Normaltekst,
    Element,
    Undertittel,
    Systemtittel,
} from 'nav-frontend-typografi';

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
    return (
        <table>
            <tbody>
                {openingHours.map((opening, ix) => {
                    // TODO: check why stengt is a string?
                    const compKey = `${metaKey}-${ix}`;

                    console.log(opening.dato);
                    return (
                        <tr key={compKey}>
                            {opening.dato && <td>{opening.dato}</td>}
                            <td>{opening.dag}</td>
                            {opening.fra && opening.til && (
                                <td>{`${opening.fra} - ${opening.til}`}</td>
                            )}
                            {opening.stengt === 'true' && (
                                <td>{closedLabel}</td>
                            )}
                            {opening.kommentar && <td>{opening.kommentar}</td>}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

const getMetaOpeningHours = (openingHours: OpeningHours[], metaKey: string) => {
    return (
        <ul className="hidden">
            {openingHours.map((opening, ix) => {
                const hours = !opening.stengt ? (
                    <>
                        <time
                            itemProp="opens"
                            data-th-datetime="${opening.fra}"
                        >
                            {opening.fra}
                        </time>
                        <time
                            itemProp="closes"
                            data-th-datetime="${opening.til}"
                        >
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
                        <time
                            itemProp="validFrom"
                            dateTime="${opening.isoDate}"
                        >
                            {opening.dato}
                        </time>
                        <time
                            itemProp="validThrough"
                            dateTime="${opening.isoDate}"
                        >
                            {opening.dato}
                        </time>
                        {hours}
                    </li>
                );
            })}
        </ul>
    );
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
            <div
                key={rec.id}
                itemScope
                itemProp="http://schema.org/localbusiness"
            >
                <Element tag="h3" itemProp="name">
                    {reception.place}
                </Element>
                <Normaltekst
                    itemProp="address"
                    itemType="http://schema.org/postaladdress"
                >
                    {reception.address}
                </Normaltekst>
                {/* exceptions in opening hours */}
                {reception.openingHoursExceptions.length > 0 && (
                    <>
                        <h4>Spesielle åpningstider</h4>
                        {metaOpeningHoursExceptions}
                        {openingHoursExceptions}
                    </>
                )}

                {/* opening hours */}
                {reception.openingHours.length > 0 && (
                    <>
                        <h4>Åpningstider</h4>
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
                    </>
                )}
            </div>
        );
    });

    return (
        <>
            <Systemtittel className="publikumsmottak__header">
                Publikumsmottak
            </Systemtittel>
            {receptions}
        </>
    );
};

export default Reception;
