import React from 'react';
import { Header } from './Header';
import { TypoStyle } from '../../../types/typo-style';
import { HeaderCommonConfig } from '../../../types/component-props/_mixins';
import './PageHeader.less';

type Props = {
    justify?: HeaderCommonConfig['justify'];
    children: string;
};

export const PageHeader = ({ justify, children }: Props) => {
    return children ? (
        <Header
            typoStyle={TypoStyle.Sidetittel}
            tag={'h1'}
            justify={justify}
            className={'page-header'}
        >
            {children}
        </Header>
    ) : null;
};
