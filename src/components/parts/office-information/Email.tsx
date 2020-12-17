import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';

const parseEmail = (emailString: string) => {
    if (!emailString) {
        return '';
    }

    let email: string;
    let internal: boolean = false;
    let match: string[];
    const betweenBracketsPattern = /\[(.*?)\]/g;

    while ((match = betweenBracketsPattern.exec(emailString)) !== null) {
        const matchedRes = match[1];
        if (matchedRes.indexOf('@') !== -1) {
            email = matchedRes;
        } else if (matchedRes === 'true') {
            internal = true;
        }
    }
    if (internal) {
        return '';
    }
    return email;
};

interface Props {
    email: string;
    unitType: string;
}

export const Email = (props: Props) => {
    const emailAddress = parseEmail(props.email);
    return ['HMS', 'ALS', 'TILTAK'].includes(props.unitType) &&
        emailAddress !== '' ? (
        <div
            itemProp="contactPoint"
            itemScope
            itemType="http://schema.org/ContactPoint"
        >
            <Element tag="h2" itemProp="contactType">
                Epost
            </Element>
            <Normaltekst itemProp="email">{emailAddress}</Normaltekst>
        </div>
    ) : null;
};
