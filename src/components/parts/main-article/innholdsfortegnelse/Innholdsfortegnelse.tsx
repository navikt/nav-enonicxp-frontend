import React from 'react';
import { LenkeUstylet } from '../../../_common/lenke/LenkeUstylet';
import './Innholdsfortegnelse.less';
import { Language, translator } from '../../../../translations';

interface Props {
    innholdsfortegnelse: string[];
    language: Language;
}

const Innholdsfortegnelse = (props: Props) => {
    if (props.innholdsfortegnelse.length === 0) {
        return null;
    }
    const getLabel = translator('mainArticle', props.language);

    return (
        <nav className="table-of-contents" data-selected-id>
            <h2 className="visuallyhidden">{getLabel('tableOfContents')}</h2>
            <ol>
                {props.innholdsfortegnelse.map((item, index) => (
                    <li key={index}>
                        <LenkeUstylet
                            aria-label={`${getLabel('jumpTo')} ${item}`}
                            href={`#chapter-${index + 1}`}
                        >
                            {item}
                        </LenkeUstylet>
                    </li>
                ))}
            </ol>
        </nav>
    );
};
export default Innholdsfortegnelse;
