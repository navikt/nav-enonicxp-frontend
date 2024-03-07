import React from 'react';
import { SectionWithHeaderProps } from '../../../types/component-props/layouts/section-with-header';
import { ContentProps } from '../../../types/content-props/_content-common';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
import { Header } from '../../_common/headers/Header';
import { XpImage } from '../../_common/image/XpImage';
import { FilterBar } from '../../_common/filter-bar/FilterBar';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { SectionNavigation } from './section-navigation/SectionNavigation';
import { RelatedSituations } from 'components/_common/relatedSituations/RelatedSituations';
import { AlternativeAudience } from 'components/_common/alternativeAudience/AlternativeAudience';
import { ProductPageData } from 'types/content-props/dynamic-page-props';

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
        return (
            <EditorHelp
                type={'error'}
                text={'Feil: Komponenten mangler data'}
            />
        );
    }

    const { title, anchorId, icon, border, toggleCopyButton, displays } =
        config;
    const isEditorView = pageProps.editorView === 'edit';
    const showSubsectionNavigation = pageProps.data?.showSubsectionNavigation;

    const iconImgProps = icon?.icon;

    const shouldShowFilterBar = regions.content?.components?.some(
        (component) =>
            component.config?.filters && component.config.filters.length > 0
    );

    // Also make sure still show region if there are already components in it.
    const shouldShowIntroRegion =
        regions.intro?.components?.length > 0 ||
        (shouldShowFilterBar && isEditorView);

    const shouldShowAlternativeAudience =
        displays?._selected === 'alternativeAudience';

    const shouldShowRelatedSituations =
        displays?._selected === 'relatedSituations';

    // Safe to cast as ProductPageData as undefined will be handlet by component via EditorHelp.
    const alternativeAudience = (pageProps.data as ProductPageData)
        ?.alternativeAudience;
    const relatedSituations = (pageProps.data as ProductPageData)
        ?.relatedSituations;

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            layoutStyle={border && getBorderStyle(border)}
            modifiers={!!iconImgProps && ['with-icon']}
            id={iconImgProps ? undefined : anchorId}
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
                        maxWidth={64}
                    />
                </div>
            )}
            {title && (
                <Header
                    size="large"
                    level="2"
                    justify={'left'}
                    hideCopyButton={toggleCopyButton}
                    anchorId={anchorId}
                    setId={false}
                    className="custom-header-style"
                >
                    {title}
                </Header>
            )}
            {showSubsectionNavigation && (
                <SectionNavigation
                    introRegion={regions.intro}
                    contentRegion={regions.content}
                />
            )}
            {shouldShowIntroRegion && (
                <Region pageProps={pageProps} regionProps={regions.intro} />
            )}
            {shouldShowFilterBar && <FilterBar layoutProps={layoutProps} />}
            <Region pageProps={pageProps} regionProps={regions.content} />
            {shouldShowRelatedSituations && (
                <RelatedSituations
                    relatedSituations={relatedSituations}
                    config={displays?.relatedSituations}
                    pageProps={pageProps}
                />
            )}
            {shouldShowAlternativeAudience && (
                <AlternativeAudience
                    alternativeAudience={alternativeAudience}
                    config={displays?.alternativeAudience}
                    pageProps={pageProps}
                />
            )}
        </LayoutContainer>
    );
};
