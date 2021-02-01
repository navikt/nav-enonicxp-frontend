import React from 'react';
import { ContentProps } from '../../types/content-props/_content-common';
import { LayoutProps } from '../../types/component-props/layouts';
import { BEM } from '../../utils/bem';
import './LayoutContainer.less';

type Props = {
    pageProps: ContentProps;
    layoutProps: LayoutProps;
    fullwidth?: boolean;
    innerStyle?: React.CSSProperties;
    outerStyle?: React.CSSProperties;
    children: React.ReactNode;
};

export const LayoutContainer = ({
    layoutProps,
    pageProps,
    fullwidth,
    innerStyle,
    outerStyle,
    children,
}: Props) => {
    const { descriptor, path, type } = layoutProps;

    const bem = BEM(type);
    const layoutName = descriptor.split(':')[1];

    const editorProps = pageProps.editMode
        ? {
              'data-portal-component-type': type,
              'data-portal-component': path,
          }
        : undefined;

    return (
        <div
            className={`${bem('outer')} ${
                fullwidth ? bem('outer', 'fullwidth') : ''
            }`}
            style={outerStyle}
            {...editorProps}
        >
            <div className={`${bem()} ${bem(layoutName)}`} style={innerStyle}>
                {children}
            </div>
        </div>
    );
};
