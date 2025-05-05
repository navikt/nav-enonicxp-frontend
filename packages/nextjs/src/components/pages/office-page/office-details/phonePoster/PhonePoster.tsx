import React from 'react';
import { BodyLong, BodyShort, Heading } from '@navikt/ds-react';
import { PhoneFillIcon } from '@navikt/aksel-icons';
import { OfficeDetailsProps } from 'components/pages/office-page/office-details/OfficeDetails';
import { translator } from 'translations';
import { officeDetailsFormatPhoneNumber } from 'components/pages/office-page/office-details/utils';
import { usePageContentProps } from 'store/pageContext';
import { forceArray } from 'utils/arrays';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import Config from 'config';
import { AudienceChannels } from './AudienceChannels';

import styles from './PhonePoster.module.scss';

export const PhonePoster = ({ officeData }: OfficeDetailsProps) => {
    const { language } = usePageContentProps();
    const publikumskanaler = forceArray(officeData.brukerkontakt?.publikumskanaler);
    const getOfficeTranslations = translator('office', language);

    const machineReadablePhone = (officeData.telefonnummer ?? Config.vars.hovedNummer).replace(
        /\s|\+47/g,
        ''
    );
    const humanReadablePhone = officeDetailsFormatPhoneNumber(machineReadablePhone);
    const phoneInformation =
        officeData.telefonnummerKommentar ?? getOfficeTranslations('phoneInformation');

    const phoneHeader =
        officeData.type === 'HMS'
            ? getOfficeTranslations('phoneToHMS')
            : getOfficeTranslations('phoneToNav');

    return (
        <div className={styles.phonePoster}>
            <Heading level="2" size="small" className={styles.heading}>
                {phoneHeader}
            </Heading>
            <BodyShort className={styles.phoneNumberWrapper}>
                <LenkeBase href={`tel:+47${machineReadablePhone}`} className={styles.phoneNumber}>
                    <PhoneFillIcon aria-hidden="true" className={styles.telephoneIcon} />
                    {humanReadablePhone}
                </LenkeBase>
            </BodyShort>
            <BodyLong spacing={publikumskanaler.length > 0}>{phoneInformation}</BodyLong>
            {publikumskanaler.length > 0 && (
                <>
                    <Heading size="small" level="3">
                        {getOfficeTranslations('alternativeContacts')}
                    </Heading>
                    <AudienceChannels publikumskanaler={publikumskanaler} />
                </>
            )}
        </div>
    );
};
