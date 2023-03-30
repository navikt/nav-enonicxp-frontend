import { BodyShort, Link } from '@navikt/ds-react';
import { AudienceContact } from 'types/content-props/office-details-props';

import styles from './AudienceChannels.module.scss';

type AudienceChannelsProps = {
    publikumskanaler: AudienceContact[];
};

const splitPhoneNumber = (acc: string[], char: string, index: number) => {
    return index % 2 === 0 ? [...acc, char] : [...acc, char, ' '];
};

export const AudienceChannels = ({
    publikumskanaler,
}: AudienceChannelsProps) => {
    const createLink = (emailOrPhone: string) => {
        const isEmail = emailOrPhone.includes('@');
        const humanReadablePhoneNumber = emailOrPhone
            .split('')
            .reduce(splitPhoneNumber, [])
            .join('');
        const href = isEmail ? `mailto:${emailOrPhone}` : `tel:${emailOrPhone}`;
        return (
            <Link href={href}>
                {isEmail ? emailOrPhone : humanReadablePhoneNumber}
            </Link>
        );
    };

    if (publikumskanaler.length === 1) {
        return (
            <>
                {publikumskanaler[0].beskrivelse}:{' '}
                {createLink(
                    publikumskanaler[0].epost || publikumskanaler[0].telefon
                )}
            </>
        );
    }

    return (
        <li className={styles.audienceChannels}>
            {publikumskanaler.map((kanal) => (
                <BodyShort key={kanal.sortOrder}>
                    {`${kanal.beskrivelse}: `}
                    {createLink(kanal.epost || kanal.telefon)}
                </BodyShort>
            ))}
        </li>
    );
};
