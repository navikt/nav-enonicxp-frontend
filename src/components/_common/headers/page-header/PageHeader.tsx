import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { HeaderCommonConfig } from 'types/component-props/_mixins';
import { Level, Size } from 'types/typo-style';
import { classNames } from 'utils/classnames';

import style from './PageHeader.module.scss';

type Props = {
    justify?: HeaderCommonConfig['justify'];
    level?: Level;
    size?: Size;
    className?: string;
    children: string;
};

export const PageHeader = ({ justify, children, level, size, className }: Props) => {
    return children ? (
        <Header
            level={level || '1'}
            size={size || 'xlarge'}
            justify={justify}
            className={classNames(style.pageHeader, className)}
            hideCopyButton
        >
            {children}
        </Header>
    ) : null;
};
