import { BodyShort, Link } from '@navikt/ds-react';
import { AudienceContact } from 'types/content-props/office-details-props';

import styles from './AudienceChannels.module.scss';

type AudienceChannelsProps = {
    publikumskanaler: AudienceContact[];
};

export const AudienceChannels = ({
    publikumskanaler,
}: AudienceChannelsProps) => {
    const linkify = (text: string) => {
        const isEmail = text.includes('@');
        const clickableLink = isEmail ? `mailto:${text}` : `tel:${text}`;
        return <Link href={clickableLink}>{text}</Link>;
    };

    if (publikumskanaler.length === 0) {
        return (
            <>
                `${publikumskanaler[0].beskrivelse}: $
                {linkify(
                    publikumskanaler[0].epost || publikumskanaler[0].telefon
                )}
                `
            </>
        );
    }

    return (
        <li className={styles.audienceChannels}>
            {publikumskanaler.map((kanal) => (
                <BodyShort key={kanal.sortOrder}>
                    {`${kanal.beskrivelse}: `}
                    {linkify(kanal.epost || kanal.telefon)}
                </BodyShort>
            ))}
        </li>
    );
};
