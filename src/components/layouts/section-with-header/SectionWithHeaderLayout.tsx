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
/* eslint-disable-next-line */
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
    ContentType.SituationPage,
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
    const showTopMarker = !!(isTemplateV2 && title);

    const showIcon = !!(iconImgProps && !isTemplateV2);

    return (
        <LayoutContainer
            className={classNames(
                style.container,
                iconImgProps && style.withIcon,
                showTopMarker && style.topMarker,
                !showTopMarker && style.pullUp,
                isTemplateV2 && isEditorView && style.editorViewBorder
            )}
            pageProps={pageProps}
            layoutProps={layoutProps}
            layoutStyle={border && getBorderStyle(border)}
            tabIndex={-1}
        >
            {showIcon && (
                <div
                    className={'icon-container'}
                    tabIndex={-1}
                    style={{
                        ...(icon.color && { backgroundColor: icon.color }),
                    }}
                >
                    <XpImage
                        imageProps={iconImgProps}
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
                    hideCopyButton={true}
                    anchorId={anchorId}
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
