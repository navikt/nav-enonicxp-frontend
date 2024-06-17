import React from 'react';
import { SectionWithHeaderProps } from 'types/component-props/layouts/section-with-header';
import { SectionNavigation } from 'components/_common/section-navigation/SectionNavigation';
import { ContentProps } from 'types/content-props/_content-common';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';
import { Header } from 'components/_common/headers/Header';
import { FilterBar } from 'components/_common/filter-bar/FilterBar';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { classNames } from 'utils/classnames';

import style from './SectionWithHeaderLayout.module.scss';

type BorderProps = NonNullable<SectionWithHeaderProps['config']['border']>;

const getBorderStyle = ({ color = '#ffffff', width = 3, rounded }: BorderProps) => ({
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
        return <EditorHelp type={'error'} text={'Feil: Komponenten mangler data'} />;
    }

    const { title, anchorId, border } = config;
    const isEditorView = pageProps.editorView === 'edit';
    const showSubsectionNavigation = pageProps.data?.showSubsectionNavigation;

    const shouldShowFilterBar = regions.content?.components?.some(
        (component) => component.config?.filters && component.config.filters.length > 0
    );

    // Also make sure we always region if there are already components in it.
    const shouldShowIntroRegion =
        regions.intro?.components?.length > 0 || (shouldShowFilterBar && isEditorView);

    const showTopMarker = !!title;

    return (
        <LayoutContainer
            className={classNames(
                style.container,
                showTopMarker && style.topMarker,
                !showTopMarker && style.pullUp,
                isEditorView && style.editorViewBorder
            )}
            pageProps={pageProps}
            layoutProps={layoutProps}
            layoutStyle={border && getBorderStyle(border)}
            id={anchorId}
            tabIndex={-1}
        >
            {title && (
                <Header
                    size="large"
                    level="2"
                    justify={'left'}
                    hideCopyButton={true}
                    className={style.header}
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
