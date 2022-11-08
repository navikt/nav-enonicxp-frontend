import React from 'react';
import { LenkeBase } from '../../../../_common/lenke/LenkeBase';

import style from './Innholdsfortegnelse.module.scss';

interface Props {
    label: string;
    innholdsfortegnelse: string[];
}

const Innholdsfortegnelse = (props: Props) => {
    if (props.innholdsfortegnelse.length === 0) {
        return null;
    }

    return (
        <nav className={style.tableOfContents} aria-label={props.label}>
            <ol>
                {props.innholdsfortegnelse.map((item, index) => (
                    <li key={index}>
                        <LenkeBase href={`#chapter-${index + 1}`}>
                            {item}
                        </LenkeBase>
                    </li>
                ))}
            </ol>
        </nav>
    );
};
export default Innholdsfortegnelse;
