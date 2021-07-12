import React from 'react';
import { Title, BodyShort } from '@navikt/ds-react';
import { EMail } from 'types/content-props/office-information-props';

interface Props {
    email: EMail;
    unitType: string;
}

export const Email = (props: Props) => {
    return ['HMS', 'ALS', 'TILTAK'].includes(props.unitType) &&
        props.email?.adresse &&
        props.email?.kunIntern !== 'true' ? (
        <div>
            <Title level={2} size="m">
                Epost
            </Title>
            <BodyShort>{props.email.adresse}</BodyShort>
        </div>
    ) : null;
};
