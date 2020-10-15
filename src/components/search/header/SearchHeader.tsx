import React from 'react';
import {
    Innholdstittel,
    Normaltekst,
    Undertittel,
} from 'nav-frontend-typografi';
import { BEM } from '../../../utils/bem';
import './SearchHeader.less';

type Props = {
    facet: string;
    searchTerm: string;
    numHits: number;
};

export const SearchHeader = ({ facet, searchTerm, numHits }: Props) => {
    const bem = BEM('search-header');
    const hitsCountText = `${numHits} treff${
        searchTerm ? `for: "${searchTerm}"` : ''
    }`;

    return (
        <div className={bem()}>
            <span className={bem('title')} id={'search-input-label'}>
                <Innholdstittel>{'Søk'}</Innholdstittel>
                <Undertittel>{facet}</Undertittel>
            </span>
            <Normaltekst>{hitsCountText}</Normaltekst>
        </div>
    );
};
