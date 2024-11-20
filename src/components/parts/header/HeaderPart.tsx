import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { HeadingTag, headingToLevel, headingToSize } from 'types/typo-style';
import { PartComponentProps, PartType } from 'types/component-props/parts';

import { ComponentType } from 'types/component-props/_component-common';
import style from './HeaderPart.module.scss';

export type PartConfigHeader = {
    title: string;
    anchorId: string;
    titleTag: HeadingTag;
};

export const HeaderPart = ({
    config,
    dataPortalComponent,
    dataPortalComponentType,
}: PartComponentProps<PartType.Header> & {
    dataPortalComponent?: string;
    dataPortalComponentType?: ComponentType;
}) => {
    if (!config) {
        return null;
    }

    const { title, titleTag, anchorId } = config;

    console.log('HeaderPart', dataPortalComponent);

    if (!title) {
        return null;
    }

    const tag = titleTag || 'h3';
    const level = headingToLevel[tag];
    const size = headingToSize[tag];

    return (
        <Header
            level={level}
            size={size}
            anchorId={anchorId}
            className={style.headerPart}
            dataPortalComponent={dataPortalComponent}
            dataPortalComponentType={dataPortalComponentType}
        >
            {title}
        </Header>
    );
};
