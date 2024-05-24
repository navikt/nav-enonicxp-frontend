import React from 'react';
import { SectionWithHeaderProps } from 'types/component-props/layouts/section-with-header';
import { SectionNavigation } from 'components/_common/section-navigation/SectionNavigation';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';
import { Header } from 'components/_common/headers/Header';
import { XpImage } from 'components/_common/image/XpImage';
import { FilterBar } from 'components/_common/filter-bar/FilterBar';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { classNames } from 'utils/classnames';

import styleV1 from './SectionWithHeaderLayout.module.scss';
import styleV2 from './SectionWithHeaderLayoutV2.module.scss';

type BorderProps = NonNullable<SectionWithHeaderProps['config']['border']>;

const getBorderStyle = ({ color = '#ffffff', width = 3, rounded }: BorderProps) => ({
    boxShadow: `0 0 0 ${width}px ${color} inset`,
    ...(rounded && { borderRadius: `${width * 3}px` }),
});

type Props = {
    pageProps: ContentProps;
    layoutProps: SectionWithHeaderProps;
};

const templateV2 = new Set([
    ContentType.ProductPage,
    ContentType.GenericPage,
    ContentType.ThemedArticlePage,
    ContentType.CurrentTopicPage,
    ContentType.GuidePage,
    ContentType.ToolsPage,
]);

export const SectionWithHeaderLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    if (!config) {
        return <EditorHelp type={'error'} text={'Feil: Komponenten mangler data'} />;
    }

    const { title, anchorId, icon, border } = config;
    const isTemplateV2 = templateV2.has(pageProps.type);
    const isEditorView = pageProps.editorView === 'edit';
    const showSubsectionNavigation = pageProps.data?.showSubsectionNavigation;

    const iconImgProps = icon?.icon;

    const shouldShowFilterBar = regions.content?.components?.some(
        (component) => component.config?.filters && component.config.filters.length > 0
    );

    // Also make sure we always region if there are already components in it.
    const shouldShowIntroRegion =
        regions.intro?.components?.length > 0 || (shouldShowFilterBar && isEditorView);

    const style = isTemplateV2 ? styleV2 : styleV1;

    return (
        <LayoutContainer
            className={classNames(
                style.container,
                iconImgProps && style.withIcon,
                isTemplateV2 && style.topMarker
            )}
            pageProps={pageProps}
            layoutProps={layoutProps}
            layoutStyle={border && getBorderStyle(border)}
            id={iconImgProps ? undefined : anchorId}
            tabIndex={-1}
        >
            {iconImgProps && !isTemplateV2 && (
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
                    hideCopyButton={true}
                    anchorId={anchorId}
                    setId={false}
                    className={classNames(style.header, !!iconImgProps && style.headerWithIcon)}
                >
                    {title}
                </Header>
            )}
            {showSubsectionNavigation && (
                <SectionNavigation introRegion={regions.intro} contentRegion={regions.content} />
            )}
            {shouldShowIntroRegion && <Region pageProps={pageProps} regionProps={regions.intro} />}
            {shouldShowFilterBar && <FilterBar layoutProps={layoutProps} />}
            <Region pageProps={pageProps} regionProps={regions.content} />
        </LayoutContainer>
    );
};
