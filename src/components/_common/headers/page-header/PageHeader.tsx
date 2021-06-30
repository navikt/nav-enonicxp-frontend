import React from 'react';
import { Title } from '@navikt/ds-react';
import { HeaderCommonConfig } from '../../../../types/component-props/_mixins';
import './PageHeader.less';

type Props = {
    justify?: HeaderCommonConfig['justify'];
    children: string;
};

export const PageHeader = ({ justify, children }: Props) => {
    return children ? (
        <Title level={1} size="2xl">
            {children}
        </Title>
    ) : null;
};
