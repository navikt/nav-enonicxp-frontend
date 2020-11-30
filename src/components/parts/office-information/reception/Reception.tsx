import React from 'react';
import { formatAddress } from './../utils';
import { formatDate } from 'utils/datetime';
import { translator, Language } from 'translations';
import {
    AudienceReception,
    OpeningHoursProps,
} from '../../../../types/content-props/office-information-props';
import { Normaltekst, Element, Systemtittel } from 'nav-frontend-typografi';
import OpeningHours from './OpeningHours';
import { BEM } from '../../../../utils/bem';
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

const MetaOpeningHours = (props: {
    openingHours: OpeningHoursProps[];
    metaKey: string;
}) => {
    return (
        <ul className="hidden">
            {props.openingHours.map((opening, ix) => {
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
                const compKey = `${props.metaKey}-${ix}`;
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
    const bem = BEM('publikumsmottak');

    return (
        <div className={bem()}>
            <Systemtittel className={bem('header')}>
                Publikumsmottak
            </Systemtittel>
            {props.receptions.map((rec: AudienceReception) => {
                const reception = formatAudienceReception(rec);

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
                                <Element tag="h3">
                                    Spesielle åpningstider
                                </Element>
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
                                <Element tag="h3">Åpningstider</Element>
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
