import React from 'react';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { AreaCard } from 'components/_common/areaCard/AreaCard';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { LinkSelectable } from 'types/component-props/_mixins';

export type AreaCardGraphicsType =
    | 'payments'
    | 'cases'
    | 'employment-status-form'
    | 'work'
    | 'family'
    | 'health'
    | 'accessibility'
    | 'pension'
    | 'social_counselling';

export type PartConfigAreaCard = {
    link: LinkSelectable;
    area: AreaCardGraphicsType;
};

export const AreaCardPart = ({ config }: PartComponentProps<PartType.AreaCard>) => {
    if (!config) {
        return <EditorHelp text={'Kortet mangler konfigurasjon'} />;
    }

    const { link, area } = config;
    const linkProps = getSelectableLinkProps(link);

    return <AreaCard path={linkProps.url} title={linkProps.text} area={area} />;
};
