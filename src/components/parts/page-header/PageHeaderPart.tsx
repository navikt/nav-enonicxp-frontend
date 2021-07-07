import React from 'react';
import { PageHeaderProps } from '../../../types/component-props/parts/page-header';
import { PageHeader } from '../../_common/headers/page-header/PageHeader';

export const PageHeaderPart = ({ config }: PageHeaderProps) => {
    return <PageHeader justify="center">{config.title}</PageHeader>;
};
