import React from 'react';
import {
    OfficeInformationProps,
    Address,
    OpeningHours,
    AudienceReception,
} from 'types/content-types/office-information-props';
/* import { RegionProps } from '../../page-components/_dynamic/DynamicRegions'; */
import { formatDate } from 'utils/datetime';
import { ParsedHtml } from '../_dynamic/ParsedHtml';

import { BEM } from 'utils/bem';

const dagArr: string[] = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag'];

const formatAddress = (address: Address, withZip: boolean) => {
    if (!address) {
        return '';
    }
    let formatedAddress: string;
    if (address.type === 'postboksadresse') {
        const postboksanlegg = address.postboksanlegg
            ? ` ${address.postboksanlegg}`
            : '';
        formatedAddress = `Postboks ${address.postboksnummer}${postboksanlegg}`;
    } else {
        const husnummer = address.husnummer ? ` ${address.husnummer}` : '';
        const husbokstav = address.husbokstav ? `${address.husbokstav}` : '';
        formatedAddress = `${address.gatenavn}${husnummer}${husbokstav}`;
    }
    if (withZip) {
        let poststed = address ? address.poststed || '' : '';
        poststed = poststed.toUpperCase();

        formatedAddress += `, ${address.postnummer} ${poststed}`;
    }
    return formatedAddress;
};

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
    return dagArr.indexOf(a.dag) - dagArr.indexOf(b.dag);
};

const formatAudienceReception = (
    audienceReception: AudienceReception,
    language: string = 'no'
) => {
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
        besokkom: formatAddress(audienceReception.besoeksadresse, true),
        stedbeskrivelse:
            audienceReception.stedsbeskrivelse ||
            audienceReception.besoeksadresse.poststed,
        unntakAapning: aapningstider.exceptions,
        apning: aapningstider.regular.sort(sortOpeningHours),
    };
};

const isBalanced = (str: string) => {
    return (str.match(/{/g) || []).length === (str.match(/}/g) || []).length;
};

const isTextClean = (str: string) => {
    // checks for curlies in the string.
    return str.split('{').length < 2 && str.split('}').length < 2;
};

function specialInfoParseLink(infoContent: string) {
    const pattern = /\{((.*?):(.*?))\}/g;
    const result = [];

    let match = pattern.exec(infoContent);
    while (match !== null) {
        // Only correctly formatted urls should be turned into a-tags, so
        // check if the match has balanced curlies and that description is 'OK'
        if (isBalanced(match[0]) && isTextClean(match[2])) {
            result.push({
                match: match[0],
                text: match[2],
                url: match[3],
                start: match.index,
                end: pattern.lastIndex,
            });
        }
        match = pattern.exec(infoContent);
    }
    return result;
}

const parseSpecialInfo = (infoContent: string) => {
    let parsedString: string = infoContent;
    if (!parsedString) {
        return '';
    }
    // replace \n with <br />
    parsedString = parsedString.replace(/(?:\r\n|\r|\n)/g, '<br>');
    // replace urls
    const urls = specialInfoParseLink(parsedString);
    urls.forEach((url) => {
        parsedString = parsedString.replace(
            url.match,
            `<a href='${url.url}'>${url.text}</a>`
        );
    });

    return parsedString;
};

const parseEmail = (emailString: string) => {
    if (!emailString) {
        return '';
    }

    let email: string;
    let internal: boolean = false;
    let match: string[];
    const betweenBracketsPattern = /\[(.*?)\]/g;

    while ((match = betweenBracketsPattern.exec(emailString)) !== null) {
        const matchedRes = match[1];
        if (matchedRes.indexOf('@') !== -1) {
            email = matchedRes;
        } else if (matchedRes === 'true') {
            internal = true;
        }
    }
    if (internal) {
        return '';
    }
    return email;
};

const parsePhoneNumber = (number: string, mod: number = null) => {
    const modular = mod || 2;
    if (number) {
        return number
            .replace(/ /g, '')
            .split('')
            .reduce((t, e, i) => t + e + (i % modular === 1 ? ' ' : ''), '');
    }
    return null;
};

export const OfficeInformation = (props: OfficeInformationProps) => {
    const unit = props.data.enhet;
    const contact = props.data.kontaktinformasjon;
    // location
    const location = formatAddress(contact.besoeksadresse, true);
    const locationView =
        unit.type in ['HMS', 'ALS', 'TILTAK'] && location !== '' ? (
            <div>
                <h3>Besøksadresse</h3>
                <p className="p-street-address" itemProp="streetAddress">
                    {location}
                </p>
            </div>
        ) : null;
    // contactpoint
    // phone
    const phoneView = contact?.telefonnummer ? (
        <div>
            <h3 itemProp="contactType">Telefon</h3>
            <p className="p-tel" itemProp="telephone">
                {parsePhoneNumber(contact.telefonnummer)}
            </p>
            <p>{contact.telefonnummerKommentar}</p>
        </div>
    ) : null;
    // specialInfo
    const specialInfo = parseSpecialInfo(contact.spesielleOpplysninger);
    const specialInfoView =
        specialInfo !== '' ? (
            <div className="p-note">
                <h3>Opplysninger</h3>
                <p>
                    <ParsedHtml content={specialInfo} />
                </p>
            </div>
        ) : null;
    // postAddress
    const address = formatAddress(contact.postadresse, false);
    const addressView = (
        <div itemProp="address" itemType="http://schema.org/PostalAddress">
            <h3>Postadresse</h3>
            <p>
                <span
                    className="p-post-office-box"
                    itemProp="postOfficeBoxNumber"
                >
                    {address}
                </span>
                ,
                <span className="p-postal-code" itemProp="postalCode">
                    {contact.postadresse.postnummer}
                </span>
                <span className="p-locality" itemProp="addressRegion">
                    {contact.postadresse.poststed}
                </span>
            </p>
        </div>
    );
    // fax
    const fax = parsePhoneNumber(contact.faksnummer);
    const faxView =
        fax !== '' ? (
            <div
                itemProp="contactPoint"
                itemType="http://schema.org/ContactPoint"
            >
                <h3 itemProp="contactType">Telefaks</h3>
                <p className="p-tel-fax" itemProp="faxNumber">
                    {fax}
                </p>
            </div>
        ) : null;
    // orgNr
    const orgNrView = unit.organisasjonsnummer ? (
        <div>
            <h3>Organisasjonsnummer</h3>
            <p>{unit.organisasjonsnummer}</p>
        </div>
    ) : null;
    // officeNr
    const officeNrView = unit.enhetNr ? (
        <div>
            <h3>Kontornummer</h3>
            <p>{unit.enhetNr}</p>
        </div>
    ) : null;
    // reception
    const receptions: AudienceReception[] = Array.isArray(
        contact.publikumsmottak
    )
        ? contact.publikumsmottak
        : [contact.publikumsmottak];
    const receptionsView = receptions.map((rec: AudienceReception) => {
        const reception = formatAudienceReception(rec);
        return (
            <div itemProp="http://schema.org/localbusiness">
                <h2 itemProp="name">{reception.stedbeskrivelse}</h2>
                <p></p>
                <p
                    className="p-street-address"
                    itemProp="address"
                    itemType="http://schema.org/postaladdress"
                >
                    {reception.besokkom}
                </p>
            </div>
        );
    });

    const bem = BEM('office-information');
    return (
        <article className={bem()}>
            <header></header>
            <h1>{unit.navn}</h1>
            {locationView}
            {phoneView}
            <div className="p-note">
                <h3>Innsending av skjemaer</h3>
                <p>
                    Skal du sende søknader og skjemaer, må du bruke
                    <a
                        href="https://www.nav.no/soknader/nb/person"
                        rel="external"
                    >
                        NAVs skjemaveileder.
                    </a>
                    Skjemaveilederen gir deg hjelp til å velge rett skjema og
                    rett adresse det skal sendes til.
                </p>
            </div>
            {specialInfoView}
            {addressView}
            {faxView}
            {orgNrView}
            {officeNrView}
            {receptionsView}
        </article>
    );
};
