import { BodyShort } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { AudienceContact } from 'types/content-props/office-details-props';
import { officeDetailsFormatPhoneNumber } from 'components/pages/office-page/officeDetails/utils';

import styles from './AudienceChannels.module.scss';

type AudienceChannelsProps = {
    publikumskanaler: AudienceContact[];
};

export const AudienceChannels = ({ publikumskanaler }: AudienceChannelsProps) => {
    const buildChannel = (channel: AudienceContact) => {
        return (
            <BodyShort key={channel.sortOrder} className={styles.audienceChannels}>
                {`${channel.beskrivelse}: `}
                {channel.epost && (
                    <LenkeBase href={`mailto:${channel.epost}`}>{channel.epost}</LenkeBase>
                )}
                {channel.telefon && (
                    <LenkeBase href={`tel:${channel.telefon}`}>
                        {officeDetailsFormatPhoneNumber(channel.telefon)}
                    </LenkeBase>
                )}
            </BodyShort>
        );
    };

    if (publikumskanaler.length === 0) {
        return null;
    }

    if (publikumskanaler.length === 1) {
        return <>{buildChannel(publikumskanaler[0])}</>;
    }

    return (
        <ul className={styles.audienceChannels}>
            {publikumskanaler.map((kanal) => (
                <li className={styles.channelItem} key={kanal.sortOrder}>
                    {buildChannel(kanal)}
                </li>
            ))}
        </ul>
    );
};
