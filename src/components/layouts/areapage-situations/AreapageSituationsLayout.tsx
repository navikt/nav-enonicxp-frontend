import React from 'react';
import { AreapageSituationsProps } from '../../../types/component-props/layouts/areapage-situations';
import { ContentProps } from '../../../types/content-props/_content-common';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { LayoutContainer } from '../LayoutContainer';
import { Header } from '../../_common/headers/Header';
import Region from '../Region';

import style from './AreapageSituationsLayout.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: AreapageSituationsProps;
};

export const AreapageSituationsLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    if (!config || !regions) {
        return (
            <EditorHelp
                type={'error'}
                text={'Feil: Komponenten mangler data'}
            />
        );
    }

    const { title } = config;

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            className={style.container}
        >
            <Header
                level={'2'}
                justify={'left'}
                size={'large'}
                className={style.header}
            >
                {title}
            </Header>
            <Region
                pageProps={pageProps}
                regionProps={regions.situations}
                className={style.situations}
            />
        </LayoutContainer>
    );
};
