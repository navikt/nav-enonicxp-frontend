import React from 'react';
import { GuidePageProps } from 'types/content-props/dynamic-page-props';
import { ComponentMapper } from 'components/ComponentMapper';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';

import { PartType } from 'types/component-props/parts';
import { ButtonPartTwo } from 'components/parts/button/ButtonPart';
import { XpComponentsConfigProvider } from 'components/xp-components/xpComponentsConfig';
import style from './GuidePage.module.scss';

export const GuidePage = (props: GuidePageProps) => {
    return (
        <XpComponentsConfigProvider
            config={{
                parts: { [PartType.Button]: ButtonPartTwo },
            }}
        >
            <article className={style.guidePage}>
                <ThemedPageHeader contentProps={props} />
                <div className={style.content}>
                    <ComponentMapper componentProps={props.page} contentProps={props} />
                </div>
            </article>
        </XpComponentsConfigProvider>
    );
};
