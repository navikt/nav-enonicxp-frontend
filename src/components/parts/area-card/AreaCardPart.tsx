import React from 'react';
import { AreaCardPartProps } from '../../../types/component-props/parts/area-card';
import { getSelectableLinkProps } from '../../../utils/links-from-content';

import { AreaCard } from 'components/_common/area-card/AreaCard';

export const AreaCardPart = ({ config }: AreaCardPartProps) => {
    if (!config) {
        return null;
    }

    const { link } = config;
    const linkProps = getSelectableLinkProps(link);

    return <AreaCard href={linkProps.url} title={linkProps.text}></AreaCard>;
};
