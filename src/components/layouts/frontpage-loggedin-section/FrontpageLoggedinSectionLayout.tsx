import React from 'react';

import { FrontpageLoggedinSectionLayoutProps } from 'types/component-props/layouts/frontpage-loggedin-section';
import { ContentProps } from 'types/content-props/_content-common';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { Header } from 'components/_common/headers/Header';
import Region from 'components/layouts/Region';
import { AuthDependantRender } from 'components/_common/auth-dependant-render/AuthDependantRender';
import { useAuthState } from 'store/hooks/useAuthState';
import { capitalize } from 'utils/string';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { MoreLink } from 'components/_common/moreLink/MoreLink';

import style from './FrontpageLoggedinSectionLayout.module.scss';

const HeaderWithName = ({ headerText }: { headerText: string }) => {
    const { language } = usePageContentProps();
    const { name } = useAuthState();

    // Fallback message if for some reason the users name is not available
    const greetings = translator('greetings', language);

    return (
        <Header level={'2'} size={'large'} justify={'left'} className={style.header}>
            {name ? headerText.replace('$navn', capitalize(name)) : greetings('hi')}
        </Header>
    );
};

type Props = {
    layoutProps: FrontpageLoggedinSectionLayoutProps;
    pageProps: ContentProps;
};

export const FrontpageLoggedinSectionLayout = ({ layoutProps, pageProps }: Props) => {
    const { config, regions } = layoutProps;
    if (!config || !regions) {
        return <EditorHelp type={'error'} text={'Feil: Komponenten mangler data'} />;
    }

    const { header, mypage } = config;

    return (
        <AuthDependantRender renderOn={'loggedIn'}>
            <LayoutContainer
                pageProps={pageProps}
                layoutProps={layoutProps}
                className={style.layout}
                data-hj-suppress
            >
                <HeaderWithName headerText={header} />
                <Header level={'2'} size={'small'} justify={'left'} className={style.services}>
                    Dine tjenester
                </Header>
                <Region pageProps={pageProps} regionProps={regions.cards} className={style.cards} />
                <MoreLink link={mypage?.link} />
            </LayoutContainer>
        </AuthDependantRender>
    );
};
