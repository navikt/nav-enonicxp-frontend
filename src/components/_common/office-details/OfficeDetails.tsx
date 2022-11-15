import { Accordion } from '@navikt/ds-react';
import classNames from 'classnames';
import { OfficeEditorialPageData } from 'types/content-props/dynamic-page-props';
import { Heading, Link, BodyShort } from '@navikt/ds-react';
import styles from './OfficeDetails.module.scss';
import {
    formatAddress,
    normalizeReceptionAsArray,
    parsePhoneNumber,
} from './utils';
import Reception from './reception/Reception';
import { OfficeDetailsProps } from 'types/content-props/office-details-props';

export const OfficeDetails = (props: OfficeDetailsProps) => {
    // console.log(props);
    const { kontaktinformasjon, enhet } = props.officeData;

    const telephone = parsePhoneNumber(kontaktinformasjon.telefonnummer);
    const telephoneCommentary = kontaktinformasjon.telefonnummerKommentar;

    const visitingAdress = formatAddress(
        kontaktinformasjon.besoeksadresse,
        true
    );
    const postalAddress = formatAddress(kontaktinformasjon.postadresse, true);
    // console.log(postalAddress);
    const publikumsmottak = normalizeReceptionAsArray(
        kontaktinformasjon.publikumsmottak
    );

    console.log(publikumsmottak);
    return (
        <div className={styles.wide}>
            <div className="content">
                <div
                    className={classNames(
                        styles.officeDetails,
                        'region__pageContent'
                    )}
                >
                    <Heading level="2" size="medium">
                        Du finner oss her
                    </Heading>
                    {publikumsmottak.length > 0 && (
                        <div className={styles.openingHours}>
                            <Reception
                                receptions={publikumsmottak}
                                language={props.language}
                            />
                        </div>
                    )}

                    <div className={styles.phonePoster}>
                        <div>
                            <Heading as="span" level="2" size="small">
                                Telefonnummeret til NAV er
                            </Heading>
                            <BodyShort as="h2">
                                <Link href="tel:{telephone}">{telephone}</Link>
                            </BodyShort>
                            {telephoneCommentary && (
                                <BodyShort>{telephoneCommentary}</BodyShort>
                            )}
                        </div>
                    </div>
                    <div>
                        <Accordion className={styles.officeInformation}>
                            <Accordion.Item>
                                <Accordion.Header>
                                    Kontorinformasjon
                                </Accordion.Header>
                                <Accordion.Content
                                    className={styles.officeInformation}
                                >
                                    <div>
                                        <Heading
                                            level="3"
                                            size="medium"
                                            spacing
                                        >
                                            Beliggenhet
                                        </Heading>
                                        <BodyShort>{visitingAdress}</BodyShort>
                                    </div>
                                    <div>
                                        <Heading
                                            level="3"
                                            size="medium"
                                            spacing
                                        >
                                            Postadresse
                                        </Heading>
                                        <BodyShort>
                                            <span>{postalAddress}</span>
                                        </BodyShort>
                                    </div>
                                    <Heading level="3" size="medium" spacing>
                                        Kontorinformasjon som skal ha en annen
                                        overskrift
                                    </Heading>
                                    {enhet.organisasjonsnummer && (
                                        <div>
                                            <BodyShort>
                                                Organisasjonsnummer:{' '}
                                                {enhet.organisasjonsnummer}
                                            </BodyShort>
                                        </div>
                                    )}
                                    {kontaktinformasjon.enhetNr && (
                                        <div>
                                            <BodyShort>
                                                Kontornummer:{' '}
                                                {kontaktinformasjon.enhetNr}
                                            </BodyShort>
                                        </div>
                                    )}
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
};
