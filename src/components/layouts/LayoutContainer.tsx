import React from 'react';
import { ContentProps } from '../../types/content-props/_content-common';
import { LayoutProps } from '../../types/component-props/layouts';
import { BEM } from '../../utils/bem';

type Props = {
    pageProps: ContentProps;
    layoutProps: LayoutProps;
    style?: React.CSSProperties;
    children: React.ReactNode;
};

export const LayoutContainer = ({
    layoutProps,
    pageProps,
    style,
    children,
}: Props) => {
    const { descriptor, path, type } = layoutProps;

    const bem = BEM(type);
    const layoutName = descriptor.split(':')[1];

    const editorProps = pageProps.editMode
        ? {
              'data-portal-component-type': type,
              'data-portal-component': path,
              'data-th-remove': 'tag',
          }
        : undefined;

    return (
        <div
            className={`${bem()} ${bem(layoutName)}`}
            style={style}
            {...editorProps}
        >
            {children}
        </div>
    );
};
