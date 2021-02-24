import React from 'react';
import { SectionHeaderProps } from '../../../../types/component-props/parts/section-header';
import { SectionHeader } from '../../../_common/section-header/SectionHeader';

export const SectionHeaderPart = ({ config }: SectionHeaderProps) => {
    return <SectionHeader text={config.title} anchorId={config.anchorId} />;
};
