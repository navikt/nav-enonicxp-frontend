import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';

export const KortUrlWarning = ({ content }: { content: ContentProps }) => {
    const Melding = () => {
        if (maalgruppe === 'employer') {
            return (
                <li>
                    Når målgruppen er satt til arbeidsgiver, må kort-URL-en begynne med
                    /arbeidsgiver/
                </li>
            );
        } else if (maalgruppe === 'provider') {
            return (
                <li>
                    Når målgruppen er satt til samarbeidspartner, må kort-URL-en begynne med
                    /samarbeidspartner/
                </li>
            );
        }
    };

    const maalgruppe = content.data?.audience?._selected;
    const path = content.data?.customPath;
    if (
        (maalgruppe === 'employer' && path && !path?.includes('/arbeidsgiver')) ||
        (maalgruppe === 'provider' && path && !path?.includes('/samarbeidspartner'))
    ) {
        return Melding();
    }
    return null;
};
