import { Accordion, Heading, BodyShort } from '@navikt/ds-react';
import classNames from 'classnames';
import { translator } from 'translations';
import { formatAddress, normalizeReceptionAsArray } from './utils';
import { Reception } from './reception/Reception';
import { OfficeDetailsData } from 'types/content-props/office-details-props';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { PhonePoster } from './phonePoster/PhonePoster';
import { PlaceFilled } from '@navikt/ds-icons';

import styles from './OfficeDetails.module.scss';
export interface OfficeDetailsProps {
    officeData: OfficeDetailsData;
}

export const OfficeDetails = (props: OfficeDetailsProps) => {
    const { language } = usePageConfig();

    const { postadresse, brukerkontakt, organisasjonsnummer, enhetNr } =
        props.officeData;

    const getOfficeTranslations = translator('office', language);

    const visitingAdress = formatAddress(postadresse, true);
    const postalAddress = formatAddress(postadresse, true);

    const publikumsmottak = normalizeReceptionAsArray(
        brukerkontakt.publikumsmottak
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
                    <Heading level="2" size="large" className={styles.header}>
                        <div className={styles.placeIcon}>
                            <PlaceFilled />
                        </div>
                        {getOfficeTranslations('youFindUsHere')}
                    </Heading>
                    {publikumsmottak.length > 0 && (
                        <Reception receptions={publikumsmottak} />
                    )}
                    <PhonePoster officeData={props.officeData} />
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
                                        Kontorinformasjon
                                    </Heading>
                                    {organisasjonsnummer && (
                                        <div>
                                            <BodyShort>
                                                Organisasjonsnummer:{' '}
                                                {organisasjonsnummer}
                                            </BodyShort>
                                        </div>
                                    )}
                                    {enhetNr && (
                                        <div>
                                            <BodyShort>
                                                Kontornummer: {enhetNr}
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
