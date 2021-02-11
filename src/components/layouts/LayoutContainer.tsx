import React from 'react';
import { ContentProps } from '../../types/content-props/_content-common';
import { LayoutProps } from '../../types/component-props/layouts';
import { BEM } from '../../utils/classnames';
import './LayoutContainer.less';

type Props = {
    pageProps: ContentProps;
    layoutProps: LayoutProps;
    layoutStyle?: React.CSSProperties;
    fullwidth?: boolean;
    children: React.ReactNode;
};

export const LayoutContainer = ({
    pageProps,
    layoutProps,
    layoutStyle,
    fullwidth,
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

    const className = `${bem()} ${bem(layoutName)} ${
        fullwidth ? bem('fullwidth') : ''
    }`;

    return (
        <div className={className} style={layoutStyle} {...editorProps}>
            {children}
        </div>
    );
};
