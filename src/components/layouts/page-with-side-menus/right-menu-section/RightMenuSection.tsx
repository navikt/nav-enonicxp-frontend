import React from 'react';
import Region from '../../Region';
import { CustomContentProps } from '../../../../types/content-props/_content-common';
import { RegionProps } from '../../../../types/component-props/layouts';
import { BEM, classNames } from '../../../../utils/classnames';

const bem = BEM('right-menu');

type Props = {
    pageProps: CustomContentProps;
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
