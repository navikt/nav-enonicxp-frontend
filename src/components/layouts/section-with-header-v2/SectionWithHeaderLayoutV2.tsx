import React from 'react';
import { SectionWithHeaderProps } from 'types/component-props/layouts/section-with-header';
import { ContentProps } from 'types/content-props/_content-common';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';
import { Header } from 'components/_common/headers/Header';
import { XpImage } from 'components/_common/image/XpImage';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { classNames } from 'utils/classnames';
import { SectionNavigation } from 'components/_common/section-navigation/SectionNavigation';

import style from './SectionWithHeaderLayoutV2.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: SectionWithHeaderProps;
};

export const SectionWithHeaderLayoutV2 = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    if (!config) {
        return <EditorHelp type={'error'} text={'Feil: Komponenten mangler data'} />;
    }

    const { title, anchorId, icon } = config;

    const iconImgProps = icon?.icon;

    // Intro section is depricated in V2, but show the region if there are
    // already components in it.
    const shouldShowIntroRegion = regions.intro?.components?.length > 0;

    return (
        <LayoutContainer
            className={classNames(style.container, iconImgProps && style.withIcon)}
            pageProps={pageProps}
            layoutProps={layoutProps}
            id={iconImgProps ? undefined : anchorId}
            tabIndex={-1}
        >
            {iconImgProps && (
                <div
                    className={'icon-container'}
                    id={anchorId} // Ensures anchor links scrolls to the correct position if the icon is rendered
                    tabIndex={-1}
                >
                    <XpImage imageProps={iconImgProps} alt={''} />
                </div>
            )}
            {title && (
                <Header
                    size="large"
                    level="2"
                    justify={'left'}
                    anchorId={anchorId}
                    setId={false}
                    className={classNames(style.header, !!iconImgProps && style.headerWithIcon)}
                >
                    {title}
                </Header>
            )}
            <SectionNavigation introRegion={regions.intro} contentRegion={regions.content} />
            {shouldShowIntroRegion && <Region pageProps={pageProps} regionProps={regions.intro} />}
            <Region pageProps={pageProps} regionProps={regions.content} />
        </LayoutContainer>
    );
};
