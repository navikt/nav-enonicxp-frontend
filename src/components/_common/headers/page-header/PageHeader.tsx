import React from 'react';
import { Header } from '../Header';
import { HeaderCommonConfig } from '../../../../types/component-props/_mixins';
import { Level, Size } from 'types/typo-style';
import style from './PageHeader.module.scss';

type Props = {
    justify?: HeaderCommonConfig['justify'];
    level?: Level;
    size?: Size;
    children: string;
};

export const PageHeader = ({ justify, children, level, size }: Props) => {
    return children ? (
        <Header
            level={level || '1'}
            size={size || 'xlarge'}
            justify={justify}
            className={style.pageHeader}
            hideCopyButton
        >
            {children}
        </Header>
    ) : null;
};
