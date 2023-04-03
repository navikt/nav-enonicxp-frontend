import { BodyLong, BodyShort, Heading } from '@navikt/ds-react';
import { OfficeDetailsProps } from '../OfficeDetails';
import { translator } from 'translations';
import { parsePhoneNumber } from '../utils';

import styles from './PhonePoster.module.scss';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { TelephoneFilled } from '@navikt/ds-icons';
import { forceArray } from 'utils/arrays';
import React from 'react';
import { AudienceChannels } from './AudienceChannels';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';

const phoneNumber = '55553333';

export const PhonePoster = ({ officeData }: OfficeDetailsProps) => {
    const { language } = usePageConfig();
    const publikumskanaler = forceArray(
        officeData.brukerkontakt.publikumskanaler
    );
    const getOfficeTranslations = translator('office', language);

    const humanReadablePhoneNumber = parsePhoneNumber(phoneNumber);

    return (
        <div className={styles.phonePoster}>
            <Heading level="2" size="small" className={styles.heading}>
                {getOfficeTranslations('phoneToNav')}
            </Heading>
            <BodyShort className={styles.phoneNumberWrapper}>
                <LenkeBase
                    href={`tel:${phoneNumber}`}
                    className={styles.phoneNumber}
                >
                    <TelephoneFilled className={styles.telephoneIcon} />
                    {humanReadablePhoneNumber}
                </LenkeBase>
            </BodyShort>
            <BodyLong spacing>
                {getOfficeTranslations('phoneInformation')}
            </BodyLong>
            <Heading size="small" level="3">
                {getOfficeTranslations('alternativeContacts')}
            </Heading>
            <AudienceChannels publikumskanaler={publikumskanaler} />
        </div>
    );
};
