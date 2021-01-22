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
        <div
            itemProp="contactPoint"
            itemScope
            itemType="http://schema.org/ContactPoint"
        >
            <Element tag="h2" itemProp="contactType">
                Epost
            </Element>
            <Normaltekst itemProp="email">{props.email.adresse}</Normaltekst>
        </div>
    ) : null;
};
