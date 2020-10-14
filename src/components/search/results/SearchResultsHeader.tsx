import React from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { BEM } from '../../../utils/bem';
import { LenkeNavNo } from '../../part-components/_common/lenke/LenkeNavNo';
import { enonicPathToUrl } from '../../../utils/paths';
import { Radio } from 'nav-frontend-skjema';
import { SearchSort } from '../../../types/search/search-params';
import './SearchResultsHeader.less';

const searchTipsPath =
    '/no/nav-og-samfunn/kontakt-nav/teknisk-brukerstotte/nyttig-a-vite/soketips';

type Props = {
    title: string;
    searchTerm: string;
    numHits: number;
    isSortDate: boolean;
    setSort: (s: SearchSort) => void;
};

export const SearchResultsHeader = ({
    title,
    searchTerm,
    numHits,
    isSortDate,
    setSort,
}: Props) => {
    const bem = BEM('search-results-header');
    const hitsCountText = `${numHits} treff${
        searchTerm ? `for: ${searchTerm}` : ''
    }`;

    return (
        <div className={bem()}>
            <div className={bem('top-row')}>
                <Innholdstittel>{title}</Innholdstittel>
                <Normaltekst>{hitsCountText}</Normaltekst>
            </div>
            <div className={bem('bottom-row')}>
                <div className={bem('sorting-selector')}>
                    <label>
                        <Normaltekst>{'Sortér etter:'}</Normaltekst>
                    </label>
                    <div className={bem('buttons')}>
                        <Radio
                            label={'Beste treff'}
                            name={'search-sorting'}
                            defaultChecked={!isSortDate}
                            onChange={() => setSort(SearchSort.BestMatch)}
                        />
                        <Radio
                            label={'Dato'}
                            name={'search-sorting'}
                            defaultChecked={isSortDate}
                            onChange={() => setSort(SearchSort.Newest)}
                        />
                    </div>
                </div>
                <LenkeNavNo
                    href={enonicPathToUrl(searchTipsPath)}
                    withChevron={false}
                >
                    {'Søketips'}
                </LenkeNavNo>
            </div>
        </div>
    );
};
