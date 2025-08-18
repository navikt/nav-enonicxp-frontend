import React from 'react';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';

import style from './Innholdsfortegnelse.module.scss';

type Props = {
    label: string;
    innholdsfortegnelse: string[];
};

export const Innholdsfortegnelse = ({ label, innholdsfortegnelse }: Props) => {
    if (innholdsfortegnelse.length === 0) {
        return null;
    }

    return (
        <nav className={style.tableOfContents} aria-label={label}>
            <ol>
                {innholdsfortegnelse.map((item, index) => (
                    <li key={index}>
                        <LenkeBase href={`#chapter-${index + 1}`}>{item}</LenkeBase>
                    </li>
                ))}
            </ol>
        </nav>
    );
};
