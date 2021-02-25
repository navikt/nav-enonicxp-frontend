import React from 'react';
import { Header } from '../header/Header';
import { TypoStyle } from '../../../types/typo-style';
import './PageHeader.less';

type Props = {
    title: string;
};

export const PageHeader = ({ title }: Props) => {
    return title ? (
        <Header
            typoStyle={TypoStyle.Sidetittel}
            tag={'h1'}
            text={title}
            className={'page-header'}
        />
    ) : null;
};
