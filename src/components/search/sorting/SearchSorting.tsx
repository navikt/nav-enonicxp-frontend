import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { BEM } from '../../../utils/bem';
import { LenkeNavNo } from '../../part-components/_common/lenke/LenkeNavNo';
import { enonicPathToUrl } from '../../../utils/paths';
import { Radio } from 'nav-frontend-skjema';
import { SearchSort } from '../../../types/search/search-params';
import './SearchSorting.less';

export const searchTipsPath =
    '/no/nav-og-samfunn/kontakt-nav/teknisk-brukerstotte/nyttig-a-vite/soketips';

type Props = {
    isSortDate: boolean;
    setSort: (s: SearchSort) => void;
};

export const SearchSorting = ({ isSortDate, setSort }: Props) => {
    const bem = BEM('search-sorting-row');

    return (
        <div className={bem()}>
            <div className={bem('selector')}>
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
    );
};
