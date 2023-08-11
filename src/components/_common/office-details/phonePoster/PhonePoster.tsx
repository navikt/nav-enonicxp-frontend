import React from 'react';
import { BodyLong, BodyShort, Heading } from '@navikt/ds-react';
import { OfficeDetailsProps } from '../OfficeDetails';
import { translator } from 'translations';
import { formatPhoneNumber } from '../utils';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { PhoneFillIcon } from '@navikt/aksel-icons';
import { forceArray } from 'utils/arrays';
import { AudienceChannels } from './AudienceChannels';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import Config from 'config';

import styles from './PhonePoster.module.scss';

const humanReadablePhoneNumber = formatPhoneNumber(Config.vars.hovedNummer);

export const PhonePoster = ({ officeData }: OfficeDetailsProps) => {
    const { language } = usePageConfig();
    const publikumskanaler = forceArray(
        officeData.brukerkontakt?.publikumskanaler
    );
    const getOfficeTranslations = translator('office', language);

    return (
        <div className={styles.phonePoster}>
            <Heading level="2" size="small" className={styles.heading}>
                {getOfficeTranslations('phoneToNav')}
            </Heading>
            <BodyShort className={styles.phoneNumberWrapper}>
                <LenkeBase
                    href={Config.urls.hovedNummerTlf}
                    className={styles.phoneNumber}
                >
                    <PhoneFillIcon
                        aria-hidden="true"
                        className={styles.telephoneIcon}
                    />
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
