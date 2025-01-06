import React from 'react';

interface Props {
    maalgruppe: string;
}

export const KortUrlWarning = ({ maalgruppe }: Props) => {
    if (maalgruppe === 'employer') {
        return (
            <li>
                Når målgruppen er satt til arbeidsgiver, må kort-URL-en begynne med /arbeidsgiver/
            </li>
        );
    } else if (maalgruppe === 'provider') {
        return (
            <li>
                Når målgruppen er satt til samarbeidspartner, må kort-URL-en begynne med
                /samarbeidspartner/
            </li>
        );
    } else {
        return null;
    }
};
