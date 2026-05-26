import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';

const getMelding = (maalgruppe: string) => {
    if (maalgruppe === 'employer') {
        return 'Når målgruppen er satt til arbeidsgiver, må kort-URL-en begynne med "/arbeidsgiver/"';
    } else if (maalgruppe === 'provider') {
        return 'Når målgruppen er satt til samarbeidspartner, må kort-URL-en begynne med "/samarbeidspartner/"';
    }
};

type Props = {
    content: ContentProps;
    className?: string;
};

export const KortUrlWarning = ({ content, className }: Props) => {
    const maalgruppe = content.data?.audience?._selected;
    const path = content.data?.customPath;
    if (
        (maalgruppe === 'employer' && path && !path?.includes('/arbeidsgiver')) ||
        (maalgruppe === 'provider' && path && !path?.includes('/samarbeidspartner'))
    ) {
        return (
            <li key="kort-url-warning" className={className}>
                {getMelding(maalgruppe)}
            </li>
        );
    }
    return null;
};
