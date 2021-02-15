import React from 'react';
import { Layout } from '@navikt/ds-react';
import Region from '../../Region';
import { ContentProps } from '../../../../types/content-props/_content-common';
import { RegionProps } from '../../../../types/component-props/layouts';
import './MainContentSection.less';

type Props = {
    pageProps: ContentProps;
    regionProps: RegionProps;
};

export const MainContentSection = ({ pageProps, regionProps }: Props) => {
    return (
        <Layout.Section>
            <Region pageProps={pageProps} regionProps={regionProps} />
        </Layout.Section>
    );
};
