import React from 'react';
import { AreaCardPartProps } from 'types/component-props/parts/area-card';
import { getSelectableLinkProps } from 'utils/links-from-content';

import { AreaCard } from 'components/_common/area-card/AreaCard';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

export const AreaCardPart = ({ config }: AreaCardPartProps) => {
    if (!config) {
        return <EditorHelp text={'Kortet mangler konfigurasjon'} />;
    }

    const { link, area } = config;
    const linkProps = getSelectableLinkProps(link);

    return <AreaCard path={linkProps.url} title={linkProps.text} area={area} />;
};
