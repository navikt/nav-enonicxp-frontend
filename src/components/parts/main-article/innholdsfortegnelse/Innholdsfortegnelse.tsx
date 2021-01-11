import React from 'react';
import { LenkeUstylet } from '../../../_common/lenke/LenkeUstylet';
import './Innholdsfortegnelse.less';

interface Props {
    label: string;
    innholdsfortegnelse: string[];
}

const Innholdsfortegnelse = (props: Props) => {
    if (props.innholdsfortegnelse.length === 0) {
        return null;
    }

    return (
        <nav className="table-of-contents" data-selected-id>
            <h2 className="visuallyhidden">{props.label}</h2>
            <ol>
                {props.innholdsfortegnelse.map((item, index) => (
                    <li key={index}>
                        <LenkeUstylet href={`#chapter-${index + 1}`}>
                            {item}
                        </LenkeUstylet>
                    </li>
                ))}
            </ol>
        </nav>
    );
};
export default Innholdsfortegnelse;
