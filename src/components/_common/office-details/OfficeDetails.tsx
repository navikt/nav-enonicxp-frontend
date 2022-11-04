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
    const { kontaktinformasjon } = props.officeData;
    const telephone = parsePhoneNumber(kontaktinformasjon.telefonnummer);
    const telephoneCommentary = kontaktinformasjon.telefonnummerKommentar;
    // const postAdress = kontaktinformasjon.postadresse;
    const visitingAdress = formatAddress(
        kontaktinformasjon.besoeksadresse,
        true
    );
    const postalAddress = formatAddress(kontaktinformasjon.postadresse, true);
    console.log(postalAddress);
    const publikumsmottak = normalizeReceptionAsArray(
        kontaktinformasjon.publikumsmottak
    );
    // const contact = kontaktinformasjon;

    return (
        <div className={styles.wide}>
            <div className="content">
                <div
                    className={classNames(
                        styles.officeDetails,
                        'region__pageContent'
                    )}
                >
                    <div className={styles.openingHours}>
                        <Reception
                            receptions={publikumsmottak}
                            language={props.language}
                        />
                    </div>
                    <div className={styles.phonePoster}>
                        <div>
                            <Heading level="2" size="small">
                                Telefonnummeret til NAV er
                            </Heading>
                            <span
                                className={classNames(
                                    'navds-heading',
                                    'navds-heading--medium'
                                )}
                            >
                                <Link href="tel:{telephone}">{telephone}</Link>
                            </span>
                            {telephoneCommentary && (
                                <BodyShort>{telephoneCommentary}</BodyShort>
                            )}
                        </div>
                    </div>
                    <div className={styles.addressPoster}>
                        <Heading level="2" size="medium">
                            Kontorinformasjon
                        </Heading>
                        <Heading level="2" size="small">
                            Beliggenhet
                        </Heading>
                        <div>
                            <Heading level="2" size="small">
                                Postadresse
                            </Heading>
                            <BodyShort>
                                <span>{postalAddress}</span>
                            </BodyShort>
                        </div>
                        <Heading level="2" size="small">
                            Kontorinformasjon
                        </Heading>
                        <BodyShort>{visitingAdress}</BodyShort>
                    </div>
                </div>
            </div>
        </div>
    );
};
