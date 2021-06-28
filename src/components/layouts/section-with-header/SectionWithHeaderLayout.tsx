import React from 'react';
import { SectionWithHeaderProps } from '../../../types/component-props/layouts/section-with-header';
import { ContentProps } from '../../../types/content-props/_content-common';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
import { Header } from '../../_common/headers/Header';
import { TypoStyle } from '../../../types/typo-style';
import { XpImage } from '../../_common/image/XpImage';
import { FilterBar } from '../../_common/filter-bar/FilterBar';
import './SectionWithHeaderLayout.less';

const getBorderStyle = ({
    color = '#ffffff',
    width = 3,
    rounded,
}: SectionWithHeaderProps['config']['border']) => ({
    boxShadow: `0 0 0 ${width}px ${color} inset`,
    ...(rounded && { borderRadius: `${width * 3}px` }),
});

type Props = {
    pageProps: ContentProps;
    layoutProps: SectionWithHeaderProps;
};

export const SectionWithHeaderLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    if (!config) {
        return null;
    }

    const { title, anchorId, icon, border, toggleCopyButton } = config;

    const iconImgProps = icon?.icon;

    const shouldShowFilterBar = regions.content?.components?.some(
        (component) =>
            component.config.filters && component.config.filters.length > 0
    );

    // Also make sure not to hide region if there are already components in it.
    const shouldShowIntroRegion =
        shouldShowFilterBar || regions.intro?.components?.length > 0;

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            layoutStyle={border && getBorderStyle(border)}
            modifiers={!!iconImgProps && ['with-icon']}
            id={!iconImgProps && anchorId}
            tabIndex={-1}
        >
            {iconImgProps && (
                <div
                    className={'icon-container'}
                    id={anchorId} // Ensures anchor links scrolls to the correct position if the icon is rendered
                    tabIndex={-1}
                    style={{
                        ...(icon.color && { backgroundColor: icon.color }),
                    }}
                >
                    <XpImage
                        imageProps={iconImgProps}
                        alt={''}
                        style={{
                            ...(icon.size && {
                                height: `${icon.size}%`,
                                width: `${icon.size}%`,
                            }),
                        }}
                    />
                </div>
            )}
            {title && (
                <Header
                    typoStyle={TypoStyle.Innholdstittel}
                    tag={'h2'}
                    justify={'left'}
                    hideCopyButton={toggleCopyButton}
                    anchorId={anchorId}
                    setId={false}
                >
                    {title}
                </Header>
            )}
            {shouldShowIntroRegion && (
                <Region pageProps={pageProps} regionProps={regions.intro} />
            )}
            {shouldShowFilterBar && (
                <>
                    <FilterBar layoutProps={layoutProps} />
                </>
            )}
            <Region pageProps={pageProps} regionProps={regions.content} />
        </LayoutContainer>
    );
};
