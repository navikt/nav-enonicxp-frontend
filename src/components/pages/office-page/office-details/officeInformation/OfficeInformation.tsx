import { useState } from 'react';
import { ExpansionCard, BodyShort, Heading } from '@navikt/ds-react';
import { usePageContentProps } from 'store/pageContext';
import { translator } from 'translations';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OfficeDetailsData } from 'types/content-props/office-details-props';
import { officeDetailsFormatAddress } from 'components/pages/office-page/office-details/utils';

import styles from './OfficeInformation.module.scss';

export interface OfficeInformationProps {
    officeData: OfficeDetailsData;
}

export const OfficeInformation = ({ officeData }: OfficeInformationProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { language } = usePageContentProps();
    const getOfficeTranslations = translator('office', language);
    const title = getOfficeTranslations('officeInformation');
    const { postadresse, beliggenhet, organisasjonsnummer, enhetNr } = officeData;
    const visitingAddress = officeDetailsFormatAddress(beliggenhet, true);
    const postalAddress = officeDetailsFormatAddress(postadresse, true);

    const toggleExpandCollapse = (isOpening: boolean, tittel: string) => {
        setIsOpen(isOpening);
        logAmplitudeEvent(isOpening ? AnalyticsEvents.ACC_EXPAND : AnalyticsEvents.ACC_COLLAPSE, {
            tittel,
            opprinnelse: 'kontorinformasjon',
            komponent: 'OfficeInformation',
        });
    };

    return (
        <ExpansionCard
            size="small"
            aria-label={title}
            className={styles.officeInformation}
            onToggle={(isOpen) => toggleExpandCollapse(isOpen, title)}
            open={isOpen}
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
                        {beliggenhet.adresseTilleggsnavn && (
                            <BodyShort>{beliggenhet.adresseTilleggsnavn}</BodyShort>
                        )}
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
                                    {getOfficeTranslations('orgNumber')}: {organisasjonsnummer}
                                </BodyShort>
                            )}
                            {enhetNr && (
                                <BodyShort>
                                    {getOfficeTranslations('officeNumber')}: {enhetNr}
                                </BodyShort>
                            )}
                        </section>
                    )}
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
