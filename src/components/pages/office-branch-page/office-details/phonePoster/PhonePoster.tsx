import React from 'react';
import { BodyLong, BodyShort, Heading } from '@navikt/ds-react';
import { PhoneFillIcon } from '@navikt/aksel-icons';

import { OfficeDetailsProps } from 'components/pages/office-branch-page/office-details/OfficeDetails';
import { translator } from 'translations';
import { officeDetailsFormatPhoneNumber } from 'components/pages/office-branch-page/office-details/utils';
import { usePageContentProps } from 'store/pageContext';
import { forceArray } from 'utils/arrays';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import Config from 'config';

import { AudienceChannels } from './AudienceChannels';

import styles from './PhonePoster.module.scss';

const humanReadablePhoneNumber = officeDetailsFormatPhoneNumber(Config.vars.hovedNummer);

export const PhonePoster = ({ officeData }: OfficeDetailsProps) => {
    const { language } = usePageContentProps();
    const publikumskanaler = forceArray(officeData.brukerkontakt?.publikumskanaler);
    const getOfficeTranslations = translator('office', language);

    return (
        <div className={styles.phonePoster}>
            <Heading level="2" size="small" className={styles.heading}>
                {getOfficeTranslations('phoneToNav')}
            </Heading>
            <BodyShort className={styles.phoneNumberWrapper}>
                <LenkeBase href={Config.urls.hovedNummerTlf} className={styles.phoneNumber}>
                    <PhoneFillIcon aria-hidden="true" className={styles.telephoneIcon} />
                    {humanReadablePhoneNumber}
                </LenkeBase>
            </BodyShort>
            <BodyLong spacing={publikumskanaler.length > 0}>
                {getOfficeTranslations('phoneInformation')}
            </BodyLong>
            {publikumskanaler.length > 0 && (
                <Heading size="small" level="3">
                    {getOfficeTranslations('alternativeContacts')}
                </Heading>
            )}
            <AudienceChannels publikumskanaler={publikumskanaler} />
        </div>
    );
};
