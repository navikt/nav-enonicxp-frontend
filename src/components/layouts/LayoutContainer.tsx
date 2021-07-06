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
    modifiers?: string[];
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const LayoutContainer = ({
    pageProps,
    layoutProps,
    layoutStyle,
    modifiers,
    children,
    ...divElementProps
}: Props) => {
    const { descriptor, path, type, config = {} } = layoutProps;

    const bem = BEM(type);
    const layoutName = descriptor.split(':')[1];

    const commonLayoutStyle = getCommonLayoutStyle(config);
    const paddingConfig = config.paddingSides?._selected;

    const editorProps = pageProps.isDraft
        ? {
              'data-portal-component-type': type,
              'data-portal-component': path,
          }
        : undefined;

    return (
        <div
            {...divElementProps}
            {...editorProps}
            className={classNames(
                bem(),
                bem(layoutName),
                ...(modifiers
                    ? modifiers.map((mod) => bem(layoutName, mod))
                    : []),
                paddingConfig === 'fullWidth' && bem('fullwidth'),
                paddingConfig === 'standard' && bem('standard'),
                config.bgColor?.color && bem('bg')
            )}
            style={{ ...commonLayoutStyle, ...layoutStyle }}
        >
            {children}
        </div>
    );
};
