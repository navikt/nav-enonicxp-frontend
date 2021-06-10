import React from 'react';
import { PageHeaderProps } from '../../../types/component-props/parts/page-header';
import { PageHeader } from '../../_common/header/PageHeader';

export const PageHeaderPart = ({ config }: PageHeaderProps) => {
    return <PageHeader>{config.title}</PageHeader>;
};
