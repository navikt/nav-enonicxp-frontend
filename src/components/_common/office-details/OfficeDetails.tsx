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
    console.log(props);
    const { kontaktinformasjon, enhet } = props.officeData;

    const telephone = parsePhoneNumber(kontaktinformasjon.telefonnummer);
    const telephoneCommentary = kontaktinformasjon.telefonnummerKommentar;

    const visitingAdress = formatAddress(
        kontaktinformasjon.besoeksadresse,
        true
    );
    const postalAddress = formatAddress(kontaktinformasjon.postadresse, true);
    console.log(postalAddress);
    const publikumsmottak = normalizeReceptionAsArray(
        kontaktinformasjon.publikumsmottak
    );

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

                    <div className={styles.openingHours}>
                        <Heading level="2" size="medium">
                            Adresse
                        </Heading>
                        <Reception
                            receptions={publikumsmottak}
                            language={props.language}
                        />
                    </div>
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
                        <Heading level="2" size="medium">
                            Kontorinformasjon
                        </Heading>
                        <div>
                            <Heading level="2" size="small">
                                Beliggenhet
                            </Heading>
                            <BodyShort>{visitingAdress}</BodyShort>
                        </div>
                        <div>
                            <Heading level="2" size="small">
                                Postadresse
                            </Heading>
                            <BodyShort>
                                <span>{postalAddress}</span>
                            </BodyShort>
                        </div>
                        <Heading level="2" size="small">
                            Kontorinformasjon som skal ha en annen overskrift
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
                                    Kontornummer: {kontaktinformasjon.enhetNr}
                                </BodyShort>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
