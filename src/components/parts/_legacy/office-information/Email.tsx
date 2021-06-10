import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
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
            <Element tag="h2">Epost</Element>
            <Normaltekst>{props.email.adresse}</Normaltekst>
        </div>
    ) : null;
};
