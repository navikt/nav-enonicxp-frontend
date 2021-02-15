import React from 'react';
import Region from '../../Region';
import { ContentProps } from '../../../../types/content-props/_content-common';
import { RegionProps } from '../../../../types/component-props/layouts';
import { Layout } from '@navikt/ds-react';
import './RightMenuSection.less';
import { BEM, classNames } from '../../../../utils/classnames';

const bem = BEM('right-menu');

type Props = {
    pageProps: ContentProps;
    regionProps: RegionProps;
    stickyToggle: boolean;
};

export const RightMenuSection = ({
    pageProps,
    regionProps,
    stickyToggle,
}: Props) => {
    return (
        <Layout.Section
            right
            className={classNames(
                bem(),
                stickyToggle && bem(undefined, 'sticky')
            )}
        >
            <Region pageProps={pageProps} regionProps={regionProps} />
        </Layout.Section>
    );
};
