import React from 'react';
import {
    OfficeInformationProps,
    AudienceReception,
} from 'types/content-types/office-information-props';
/* import { RegionProps } from '../../page-components/_dynamic/DynamicRegions'; */
import { formatDate } from 'utils/datetime';
import { ParsedHtml } from '../_dynamic/ParsedHtml';
import { translator } from 'translations';
import Reception from './Reception';
import { formatAddress } from './utils';
import { BEM } from 'utils/bem';
import { Email } from './Contact';

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
    const bem = BEM('office-information');

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

    return (
        <article className={bem()}>
            <header></header>
            <h1>{unit.navn}</h1>
            {locationView}
            <Email email={contact.epost} unitType={unit.type} />
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
            <Reception receptions={receptions} language={props.language} />
        </article>
    );
};
