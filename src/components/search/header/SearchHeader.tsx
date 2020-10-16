import React from 'react';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import { BEM } from '../../../utils/bem';
import { LenkeNavNo } from '../../part-components/_common/lenke/LenkeNavNo';
import { enonicPathToUrl } from '../../../utils/paths';
import { searchTipsPath } from '../sorting/SearchSorting';
import './SearchHeader.less';

type Props = {
    facet: string;
};

export const SearchHeader = ({ facet }: Props) => {
    const bem = BEM('search-header');
    return (
        <div className={bem()}>
            <span className={bem('title')} id={'search-header'}>
                <Innholdstittel>{'Søk'}</Innholdstittel>
                <Undertittel>{facet}</Undertittel>
            </span>
            <LenkeNavNo
                href={enonicPathToUrl(searchTipsPath)}
                withChevron={false}
            >
                {'Søketips'}
            </LenkeNavNo>
        </div>
    );
};
