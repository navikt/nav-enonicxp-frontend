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
    [ContentType.FrontPageNested]: FrontPageAreaNavigation,
    [ContentType.AreaPage]: AreaPageHeader,
};

type Props = {
    pageProps: ContentProps;
    layoutProps: IndexPageProps;
};

export const IndexPage = ({ pageProps, layoutProps }: Props) => {
    const { type } = pageProps;
    const { regions } = layoutProps;

    const MiddleComponent = contentTypeSpecificComponent[type];

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            className={style.indexPage}
        >
            <>
                {/* We don't use this region on the AreaPage atm */}
                {type !== ContentType.AreaPage && (
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
