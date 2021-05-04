import React from 'react';
import { ContentProps } from '../../types/content-props/_content-common';
import { LayoutProps } from '../../types/component-props/layouts';
import { BEM, classNames } from '../../utils/classnames';
import { getCommonLayoutStyle } from './LayoutStyle';
import './LayoutContainer.less';

type Props = {
    pageProps: ContentProps;
    layoutProps: LayoutProps;
    layoutStyle?: React.CSSProperties;
    children: React.ReactNode;
};

export const LayoutContainer = ({
    pageProps,
    layoutProps,
    layoutStyle,
    children,
}: Props) => {
    const { descriptor, path, type, config } = layoutProps;

    const bem = BEM(type);
    const layoutName = descriptor.split(':')[1];

    const commonLayoutStyle = getCommonLayoutStyle(config);
    const paddingConfig = config?.paddingSides?._selected;

    const editorProps = pageProps.editMode
        ? {
              'data-portal-component-type': type,
              'data-portal-component': path,
          }
        : undefined;

    return (
        <div
            className={classNames(
                bem(),
                bem(layoutName),
                paddingConfig === 'fullWidth' && bem('fullwidth'),
                paddingConfig === 'standard' && bem('standard'),
                config.bgColor?.color && bem('bg')
            )}
            style={{ ...commonLayoutStyle, ...layoutStyle }}
            {...editorProps}
        >
            {children}
        </div>
    );
};
