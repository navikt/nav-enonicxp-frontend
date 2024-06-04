import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { PageWithSideMenus } from '../page-with-side-menus/PageWithSideMenus';
import { PageWithSideMenusProps } from 'types/component-props/pages/page-with-side-menus';

type Props = {
    pageProps: ContentProps;
    layoutProps: PageWithSideMenusProps;
};

export const SingleColPage = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    return <PageWithSideMenus pageProps={pageProps} layoutProps={layoutProps} />;
};
