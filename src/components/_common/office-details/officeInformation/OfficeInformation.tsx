import { ExpansionCard, BodyShort, Heading } from '@navikt/ds-react';
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

    const title = getOfficeTranslations('officeInformation');
    const { postadresse, beliggenhet, organisasjonsnummer, enhetNr } =
        officeData;

    const visitingAddress = formatAddress(beliggenhet, true);
    const postalAddress = formatAddress(postadresse, true);

    return (
        <ExpansionCard
            aria-label={title}
            className={styles.officeInformation}
            size="small"
        >
            <ExpansionCard.Header className={styles.expansionCardHeader}>
                <ExpansionCard.Title as="h2" size="small">
                    {title}
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <div className={styles.expansionCardContent}>
                    <section>
                        <Heading level="3" size="small" spacing>
                            {getOfficeTranslations('location')}
                        </Heading>
                        <BodyShort>{visitingAddress}</BodyShort>
                    </section>
                    <section>
                        <Heading level="3" size="small" spacing>
                            {getOfficeTranslations('postalAddress')}
                        </Heading>
                        <BodyShort>
                            <span>{postalAddress}</span>
                        </BodyShort>
                    </section>
                    {(organisasjonsnummer || enhetNr) && (
                        <section>
                            <Heading level="3" size="small" spacing>
                                {getOfficeTranslations('officeInformation')}
                            </Heading>
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
                    )}
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
