import React from 'react';
import { Heading, BodyShort } from '@navikt/ds-react';
import { LegacyOfficeEMail } from 'types/content-props/office-information-props';

const includedUnitTypes: ReadonlySet<string> = new Set(['HMS', 'ALS', 'TILTAK']);

type Props = {
    email?: LegacyOfficeEMail;
    unitType: string;
};

export const OfficeInfoEmail = ({ email, unitType }: Props) => {
    if (
        !email ||
        !email.adresse ||
        email.kunIntern === 'true' ||
        !includedUnitTypes.has(unitType)
    ) {
        return null;
    }

    return (
        <div>
            <Heading level={'2'} size={'medium'}>
                {'E-post'}
            </Heading>
            <BodyShort>{email.adresse}</BodyShort>
        </div>
    );
};
