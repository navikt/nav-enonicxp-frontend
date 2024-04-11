import React from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import Region from 'components/layouts/Region';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import { LegacyLayoutProps } from 'types/component-props/layouts/legacy-layout';
import { NewsPressHeader } from 'components/parts/_legacy/main-article/komponenter/NewsPressHeader';
import { ComponentType } from 'types/component-props/_component-common';
import { MainArticleProps } from 'types/content-props/main-article-props';

import style from './LegacyLayout.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: LegacyLayoutProps;
};

const getNewsArticleProps = (pageProps: ContentProps): MainArticleProps | null => {
    const props =
        pageProps.type === ContentType.MainArticleChapter ? pageProps.data.article : pageProps;

    return props?.type === ContentType.MainArticle &&
        (props.data.contentType === 'news' || props.data.contentType === 'pressRelease')
        ? props
        : null;
};

export const LegacyLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    const newsArticleProps = getNewsArticleProps(pageProps);

    return (
        <LayoutContainer
            className={style.container}
            pageProps={pageProps}
            layoutProps={layoutProps}
        >
            {/* Insert the news article header here, as we want it to render above both article region columns */}
            {layoutProps.type === ComponentType.Page &&
                newsArticleProps &&
                newsArticleProps.data.contentType && (
                    <NewsPressHeader
                        type={newsArticleProps.data.contentType}
                        title={newsArticleProps.displayName}
                        language={newsArticleProps.language}
                    />
                )}
            {Object.values(regions).map((regionProps) => {
                return (
                    <Region
                        pageProps={pageProps}
                        regionProps={regionProps}
                        key={regionProps.name}
                    />
                );
            })}
        </LayoutContainer>
    );
};
