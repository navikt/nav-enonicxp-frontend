import { Accordion, BodyShort, Heading } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';
import { OfficeDetailsData } from 'types/content-props/office-details-props';
import { formatAddress } from '../utils';

import styles from './OfficeInformation.module.scss';

export interface OfficeInformationProps {
    officeData: OfficeDetailsData;
}

export const OfficeInformation = ({ officeData }: OfficeInformationProps) => {
    const { language } = usePageConfig();
    const getOfficeTranslations = translator('office', language);

    const { postadresse, beliggenhet, organisasjonsnummer, enhetNr } =
        officeData;

    const visitingAddress = formatAddress(beliggenhet, true);
    const postalAddress = formatAddress(postadresse, true);

    return (
        <Accordion className={styles.officeInformation}>
            <Accordion.Item>
                <Accordion.Header>
                    <Heading level="2" size="medium">
                        {' '}
                        {getOfficeTranslations('officeInformation')}
                    </Heading>
                </Accordion.Header>
                <Accordion.Content className={styles.officeInformation}>
                    <section className={styles.section}>
                        <Heading level="3" size="small" spacing>
                            {getOfficeTranslations('location')}
                        </Heading>
                        <BodyShort>{visitingAddress}</BodyShort>
                    </section>
                    <section className={styles.section}>
                        <Heading level="3" size="small" spacing>
                            {getOfficeTranslations('postalAddress')}
                        </Heading>
                        <BodyShort>
                            <span>{postalAddress}</span>
                        </BodyShort>
                    </section>
                    <section className={styles.section}>
                        {(organisasjonsnummer || enhetNr) && (
                            <Heading level="3" size="small" spacing>
                                {getOfficeTranslations('officeInformation')}
                            </Heading>
                        )}
                        {organisasjonsnummer && (
                            <BodyShort>
                                {getOfficeTranslations('orgNumber')}:{' '}
                                {organisasjonsnummer}
                            </BodyShort>
                        )}
                        {enhetNr && (
                            <BodyShort>
                                {getOfficeTranslations('officeNumber')}:{' '}
                                {enhetNr}
                            </BodyShort>
                        )}
                    </section>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
