import React from 'react';
import Region from 'components/layouts/Region';
import { ContentProps } from 'types/content-props/_content-common';
import { RegionProps } from 'types/component-props/layouts';
import { BEM, classNames } from 'utils/classnames';

const bem = BEM('right-menu');

type Props = {
    pageProps: ContentProps;
    regionProps: RegionProps;
    sticky: boolean;
};

export const RightMenuSection = ({ pageProps, regionProps, sticky }: Props) => {
    return (
        <div className={classNames(bem(), sticky && bem(undefined, 'sticky'))}>
            <Region pageProps={pageProps} regionProps={regionProps} />
        </div>
    );
};
