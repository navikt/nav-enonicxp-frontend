import React from 'react';

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
    return props.unitType in ['HMS', 'ALS', 'TILTAK'] && emailAddress !== '' ? (
        <div itemProp="contactPoint" itemType="http://schema.org/ContactPoint">
            <h3 itemProp="contactType">Epost</h3>
            <p className="u-email" itemProp="email">
                {emailAddress}
            </p>
        </div>
    ) : null;
};
