import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { LayoutComponentProps } from 'types/component-props/layouts';
import { BEM, classNames } from 'utils/classnames';
import { usePageContentProps } from 'store/pageContext';
import { editorAuthstateClassname } from 'components/_common/authDependantRender/editorAuthstateClassname/EditorAuthstateClassname';
import { getCommonLayoutStyle } from './LayoutStyle';
import { useLayoutConfig } from './useLayoutConfig';

import style from './LayoutContainer.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: LayoutComponentProps;
    layoutStyle?: React.CSSProperties;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const LayoutContainer = ({
    layoutProps,
    layoutStyle,
    children,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    pageProps,
    ...divElementProps
}: Props) => {
    const { editorView } = usePageContentProps();
    const { layoutConfig } = useLayoutConfig();

    const { descriptor, type, config = {} } = layoutProps;
    const layoutName = descriptor.split(':')[1];
    const commonLayoutStyle = getCommonLayoutStyle(config);
    const paddingConfig = config.paddingSides?._selected;

    const bem = BEM(type);

    return (
        <div
            {...divElementProps}
            {...layoutConfig.editorProps}
            className={classNames(
                style.layout,
                bem(layoutName),
                paddingConfig === 'fullWidth' && style.fullwidth,
                paddingConfig === 'standard' && style.standard,
                config.bgColor?.color && style.bg,
                editorView === 'edit' && editorAuthstateClassname(config.renderOnAuthState),
                divElementProps.className
            )}
            style={{ ...commonLayoutStyle, ...layoutStyle }}
        >
            {children}
        </div>
    );
};
