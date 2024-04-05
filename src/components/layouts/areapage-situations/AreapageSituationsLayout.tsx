import React from 'react';

import { AreapageSituationsProps } from 'types/component-props/layouts/areapage-situations';
import { ContentProps } from 'types/content-props/_content-common';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import { Header } from 'components/_common/headers/Header';
import Region from 'components/layouts/Region';

import style from './AreapageSituationsLayout.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: AreapageSituationsProps;
};

export const AreapageSituationsLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    if (!config || !regions) {
        return <EditorHelp type={'error'} text={'Feil: Komponenten mangler data'} />;
    }

    const elementWrapper = (element: JSX.Element, key: string) => {
        return <li key={key}>{element}</li>;
    };

    const { title } = config;

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            className={style.container}
        >
            <Header level={'2'} justify={'left'} size={'large'} className={style.header}>
                {title}
            </Header>
            <EditorHelp
                text={
                    'Listen oppdateres automatisk ut fra målgruppe og område, og kan ikke endres manuelt.' +
                    ' For å fjerne et kort fra siden, velg "Skjul..." i høyre-panelet.'
                }
            />
            <EditorHelp
                text={
                    'Når listen oppdateres kan det i enkelte tilfeller vises en feilmelding.' +
                    ' Denne skal forsvinne ved reload av editoren (F5).'
                }
            />
            <Region
                pageProps={pageProps}
                regionProps={regions.situations}
                className={style.situations}
                wrapperFunction={elementWrapper}
                as="ul"
            />
        </LayoutContainer>
    );
};
