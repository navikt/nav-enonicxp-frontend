import React from 'react';
import { FrontpageLoggedinSectionLayoutProps } from '../../../types/component-props/layouts/frontpage-loggedin-section';
import { ContentProps } from '../../../types/content-props/_content-common';
import { LayoutContainer } from '../LayoutContainer';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { Header } from '../../_common/headers/Header';
import Region from '../Region';

import style from './FrontpageLoggedinSectionLayout.module.scss';

type Props = {
    layoutProps: FrontpageLoggedinSectionLayoutProps;
    pageProps: ContentProps;
};

export const FrontpageLoggedinSectionLayout = ({
    layoutProps,
    pageProps,
}: Props) => {
    const { config, regions } = layoutProps;
    if (!config || !regions) {
        return (
            <EditorHelp
                type={'error'}
                text={'Feil: Komponenten mangler data'}
            />
        );
    }

    const { header, mypage } = config;

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            className={style.layout}
        >
            <Header
                level={'2'}
                size={'xlarge'}
                justify={'left'}
                className={style.header}
            >
                {header}
            </Header>
            <Region
                pageProps={pageProps}
                regionProps={regions.cards}
                className={style.cards}
            />
        </LayoutContainer>
    );
};
