import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { ComponentMapper } from '../../ComponentMapper';
import './FlexCols.less';
import { LayoutFlexCols } from '../../../types/component-props/layouts/flex-cols';

type Props = {
    pageProps: ContentProps;
    layoutProps?: LayoutFlexCols;
};

export const FlexCols = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;
    if (!regions?.flexcols) {
        return null;
    }

    const { components, name } = regions.flexcols;
    const { numCols, bgColor, bgFullWidth } = config;

    return (
        <div className={'flex-cols'} data-portal-region={name}>
            {components.map((component) => (
                <ComponentMapper
                    key={component.path}
                    componentProps={component}
                    pageProps={pageProps}
                />
            ))}
        </div>
    );
};
