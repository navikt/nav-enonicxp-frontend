import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { LayoutProps } from '../../../types/component-props/layouts';
import { ComponentMapper } from '../../ComponentMapper';
import './FlexCols.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: LayoutProps;
};

export const FlexCols = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;
    if (!regions?.flexcols) {
        return null;
    }

    const { components, name } = regions.flexcols;

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
