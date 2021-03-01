import React from 'react';
import Region from '../../Region';
import { ContentProps } from '../../../../types/content-props/_content-common';
import { RegionProps } from '../../../../types/component-props/layouts';
import { BEM, classNames } from '../../../../utils/classnames';
import './RightMenuSection.less';

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
        <div
            className={classNames(
                bem(),
                stickyToggle && bem(undefined, 'sticky')
            )}
        >
            <Region pageProps={pageProps} regionProps={regionProps} />
        </div>
    );
};
