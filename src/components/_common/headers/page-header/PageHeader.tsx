import React from 'react';
import { Title } from '@navikt/ds-react';
import { HeaderCommonConfig } from '../../../../types/component-props/_mixins';
import { BEM, classNames } from '../../../../utils/classnames';
import './PageHeader.less';

type Props = {
    justify?: HeaderCommonConfig['justify'];
    children: string;
};

const bem = BEM('page-header');

export const PageHeader = ({ justify, children }: Props) => {
    return children ? (
        <Title
            level={1}
            size="2xl"
            className={classNames(bem(), justify ? bem('title', justify) : '')}
        >
            {children}
        </Title>
    ) : null;
};
