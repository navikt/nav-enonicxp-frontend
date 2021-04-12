import React from 'react';
import { Header } from './Header';
import { TypoStyle } from '../../../types/typo-style';
import './PageHeader.less';

type Props = {
    children: string;
};

export const PageHeader = ({ children }: Props) => {
    return children ? (
        <Header
            typoStyle={TypoStyle.Sidetittel}
            tag={'h1'}
            className={'page-header'}
        >
            {children}
        </Header>
    ) : null;
};
