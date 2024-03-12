import React from 'react';
import { ContentProps } from '../../types/content-props/_content-common';
import { LayoutProps } from '../../types/component-props/layouts';
import { BEM, classNames } from '../../utils/classnames';
import { getCommonLayoutStyle } from './LayoutStyle';
import { usePageConfig } from '../../store/hooks/usePageConfig';
import { editorAuthstateClassname } from '../_common/auth-dependant-render/AuthDependantRender';

import style from './LayoutContainer.module.scss';

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
    const { pageConfig } = usePageConfig();
    const { descriptor, path, type, config = {} } = layoutProps;
    const layoutName = descriptor.split(':')[1];
    const commonLayoutStyle = getCommonLayoutStyle(config);
    const paddingConfig = config.paddingSides?._selected;
    const editorProps = !!pageProps.editorView
        ? {
              'data-portal-component-type': type,
              'data-portal-component': path,
          }
        : undefined;
    const bem = BEM(type);

    return (
        <div
            {...divElementProps}
            {...editorProps}
            className={classNames(
                style.layout,
                bem(layoutName),
                layoutName === 'page-with-side-menus' &&
                    style.pageWithSideMenus,
                ...(modifiers
                    ? modifiers.map((mod) => bem(layoutName, mod))
                    : []),
                paddingConfig === 'fullWidth' && style.fullwidth,
                paddingConfig === 'standard' && style.standard,
                config.bgColor?.color && style.bg,
                pageConfig.editorView === 'edit' &&
                    editorAuthstateClassname(config.renderOnAuthState),
                divElementProps.className
            )}
            style={{ ...commonLayoutStyle, ...layoutStyle }}
        >
            {children}
        </div>
    );
};
