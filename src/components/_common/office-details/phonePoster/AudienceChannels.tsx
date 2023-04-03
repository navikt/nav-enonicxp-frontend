import { BodyShort } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { AudienceContact } from 'types/content-props/office-details-props';

import styles from './AudienceChannels.module.scss';

type AudienceChannelsProps = {
    publikumskanaler: AudienceContact[];
};

export const AudienceChannels = ({
    publikumskanaler,
}: AudienceChannelsProps) => {
    const splitPhoneNumber = (acc: string[], char: string, index: number) => {
        return index % 2 === 0 ? [...acc, char] : [...acc, char, ' '];
    };

    const buildHrefWithPrefix = (href: string) => {
        const prefix = href.includes('@') ? 'mailto:' : 'tel:';
        return `${prefix}${href}`;
    };

    const buildLinkText = (href: string) => {
        return href.includes('@')
            ? href
            : href.split('').reduce(splitPhoneNumber, []).join('');
    };

    const createLink = (href: string) => {
        return (
            <LenkeBase href={buildHrefWithPrefix(href)}>
                {buildLinkText(href)}
            </LenkeBase>
        );
    };

    const buildChannel = (channel: AudienceContact) => {
        return (
            <BodyShort
                key={channel.sortOrder}
                className={styles.audienceChannels}
            >
                {`${channel.beskrivelse}: `}
                {createLink(channel.epost || channel.telefon)}
            </BodyShort>
        );
    };

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
