import React from 'react';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { AreaCard } from 'components/_common/area-card/AreaCard';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PartComponent, PartType } from 'types/component-props/parts';

export const AreaCardPart: PartComponent<PartType.AreaCard> = ({ config }) => {
    if (!config) {
        return <EditorHelp text={'Kortet mangler konfigurasjon'} />;
    }

    const { link, area } = config;
    const linkProps = getSelectableLinkProps(link);

    return <AreaCard path={linkProps.url} title={linkProps.text} area={area} />;
};
