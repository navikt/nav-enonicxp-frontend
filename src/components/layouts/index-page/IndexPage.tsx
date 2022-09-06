import React from 'react';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
import {
    ContentProps,
    ContentType,
} from '../../../types/content-props/_content-common';
import { FrontPageAreaNavigation } from './front-page/FrontPageAreaNavigation';
import { IndexPageProps } from '../../../types/component-props/pages/index-page';
import { AreaPageHeader } from './area-page/AreaPageHeader';

import style from './IndexPage.module.scss';

const contentTypeSpecificComponent: {
    [key in ContentType]?: React.FunctionComponent<{ content: ContentProps }>;
} = {
    [ContentType.FrontPage]: FrontPageAreaNavigation,
    [ContentType.AreaPage]: AreaPageHeader,
};

type Props = {
    pageProps: ContentProps;
    layoutProps: IndexPageProps;
};

export const IndexPage = ({ pageProps, layoutProps }: Props) => {
    // if (pageProps.__typename === ContentType.TemplatePage) {
    //     return <IndexPageTemplate pageProps={pageProps} />;
    // }

    const { __typename } = pageProps;
    const { regions } = layoutProps;

    const MiddleComponent = contentTypeSpecificComponent[__typename];

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            className={style.indexPage}
        >
            <>
                {__typename !== ContentType.AreaPage && (
                    <Region
                        pageProps={pageProps}
                        regionProps={regions.contentTop}
                    />
                )}
                {MiddleComponent && <MiddleComponent content={pageProps} />}
                <Region
                    className={style.contentBottom}
                    pageProps={pageProps}
                    regionProps={regions.contentBottom}
                />
            </>
        </LayoutContainer>
    );
};
