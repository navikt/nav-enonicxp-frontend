import React from 'react';
import { FrontpageLoggedinSectionLayoutProps } from '../../../types/component-props/layouts/frontpage-loggedin-section';
import { ContentProps } from '../../../types/content-props/_content-common';
import { LayoutContainer } from '../LayoutContainer';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { Header } from '../../_common/headers/Header';
import Region from '../Region';
import { LenkeStandalone } from '../../_common/lenke/LenkeStandalone';
import { getSelectableLinkProps } from '../../../utils/links-from-content';
import { LinkSelectable } from '../../../types/component-props/_mixins';
import { AuthDependantRender } from '../../_common/auth-dependant-render/AuthDependantRender';
import { useAuthState } from '../../../store/hooks/useAuthState';
import { capitalize } from '../../../utils/string';
import { translator } from '../../../translations';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { ArrowRightIcon } from '@navikt/aksel-icons';

import style from './FrontpageLoggedinSectionLayout.module.scss';

const MyPageLink = ({ link }: { link?: LinkSelectable }) => {
    if (!link) {
        return null;
    }

    const { text, url } = getSelectableLinkProps(link);

    return (
        <LenkeStandalone
            href={url}
            className={style.myPage}
            withChevron={false}
        >
            <ArrowRightIcon aria-hidden={true} className={style.arrow} />
            {text}
        </LenkeStandalone>
    );
};

const HeaderWithName = ({ headerText }: { headerText: string }) => {
    const { language } = usePageConfig();
    const { name } = useAuthState();

    // Fallback message if for some reason the users name is not available
    const greetings = translator('greetings', language);

    return (
        <Header
            level={'2'}
            size={'large'}
            justify={'left'}
            className={style.header}
        >
            {name
                ? headerText.replace('$navn', capitalize(name))
                : greetings('hi')}
        </Header>
    );
};

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
        <AuthDependantRender renderOn={'loggedIn'}>
            <LayoutContainer
                pageProps={pageProps}
                layoutProps={layoutProps}
                className={style.layout}
                data-hj-suppress
            >
                <HeaderWithName headerText={header} />
                <Header
                    level={'2'}
                    size={'small'}
                    justify={'left'}
                    className={style.services}
                >
                    Dine tjenester
                </Header>
                <Region
                    pageProps={pageProps}
                    regionProps={regions.cards}
                    className={style.cards}
                />
                <MyPageLink link={mypage?.link} />
            </LayoutContainer>
        </AuthDependantRender>
    );
};
